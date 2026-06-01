import React, { useEffect, useState } from 'react';
import { subscribeToOrders, updateOrderStatus } from './store';
import { CheckCircle2, Clock, PlayCircle, Loader2 } from 'lucide-react';

export default function AdminApp() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [newOrderCount, setNewOrderCount] = useState(0); // Optional: track new unacked orders

  useEffect(() => {
    // When a new order arrives, we should play a sound
    const unsubscribe = subscribeToOrders((newOrders) => {
      setOrders(newOrders);
      setLoading(false);
      // Logic for new sound could be: if there is any 'pending' order that we haven't seen.
      // But typically we rely on the realtime listener.
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Check if there are any pending orders
    const hasPending = orders.some(o => o.status === 'pending');
    if (hasPending) {
      playAlertSound();
    }
  }, [orders]);

  const playAlertSound = () => {
    try {
      const audio = new Audio('/assets/alert.mp3'); // We'll assume this exists or use a synth Beep later
      audio.play().catch(() => {});
    } catch(e) {}
  };

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus(orderId, status);
    } catch (err: any) {
      alert("Hata: " + err.message);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F8FAF7]"><Loader2 className="w-8 h-8 animate-spin text-[#1B422B]"/></div>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAF7] p-8 font-sans">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif italic font-bold text-[#1B422B]">Yönetim Paneli</h1>
          <p className="text-[#1B422B]/60 mt-2">Canlı Sipariş Takip Ekranı</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-[#1B422B]/10">
          <span className="text-[#1B422B]/50 uppercase tracking-widest text-xs block mb-1">Günün Özeti</span>
          <span className="text-2xl font-mono text-[#1B422B] font-medium">{orders.length} Sipariş</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Pending Column */}
        <StatusColumn 
          title="Yeni Siparişler" 
          status="pending" 
          orders={orders} 
          onStatusChange={handleStatusChange} 
          icon={<Clock className="w-5 h-5" />}
          color="bg-red-50 border-red-200"
          titleColor="text-red-700"
        />
        {/* Preparing Column */}
        <StatusColumn 
          title="Hazırlanıyor" 
          status="preparing" 
          orders={orders} 
          onStatusChange={handleStatusChange} 
          icon={<PlayCircle className="w-5 h-5" />}
          color="bg-orange-50 border-orange-200"
          titleColor="text-orange-700"
        />
        {/* Ready Column */}
        <StatusColumn 
          title="Hazır" 
          status="ready" 
          orders={orders} 
          onStatusChange={handleStatusChange} 
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="bg-green-50 border-green-200"
          titleColor="text-green-700"
        />
        {/* Delivered Column (Optional, could just be a history list) */}
        <StatusColumn 
          title="Teslim Edildi" 
          status="delivered" 
          orders={orders} 
          onStatusChange={handleStatusChange} 
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="bg-gray-50 border-gray-200"
          titleColor="text-gray-700"
        />
      </div>
    </div>
  );
}

function StatusColumn({ title, status, orders, onStatusChange, icon, color, titleColor }: any) {
  const columnOrders = orders.filter((o: any) => o.status === status);

  return (
    <div className={`rounded-3xl p-6 border ${color} flex flex-col h-[calc(100vh-140px)]`}>
      <div className={`flex items-center space-x-2 mb-6 ${titleColor}`}>
        {icon}
        <h2 className="text-xl font-bold tracking-wide">{title} <span className="opacity-50 text-base ml-1">({columnOrders.length})</span></h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar pr-2">
        {columnOrders.map((order: any) => (
          <div key={order.id} className="bg-white p-5 rounded-2xl shadow-sm border border-black/5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start border-b border-black/5 pb-3 mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {order.orderType === 'takeaway' ? 'Self Servis (Gel Al)' : order.tableNumber}
                </h3>
                {order.customerName && (
                  <p className="text-sm font-medium text-gray-700 mt-1">{order.customerName}</p>
                )}
                <span className="text-xs text-gray-500 font-mono mt-1 block">
                  {order.createdAt ? new Date(typeof order.createdAt === 'number' ? order.createdAt : order.createdAt?.seconds ? order.createdAt.seconds * 1000 : Date.now()).toLocaleTimeString() : '...'}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between text-gray-800">
                  <span className="font-medium">{item.quantity}x {item.name}</span>
                </div>
              ))}
            </div>

            {order.notes && (
              <div className="bg-yellow-50 text-yellow-800 p-3 rounded-xl text-sm mb-4 border border-yellow-200/50">
                <span className="font-bold block mb-1">Not:</span>
                {order.notes}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-auto">
              {status === 'pending' && (
                <button 
                  onClick={() => onStatusChange(order.id, 'preparing')}
                  className="flex-1 bg-gray-900 text-white font-medium py-2 rounded-xl text-sm hover:bg-gray-800 transition-colors"
                >
                  Hazırlamaya Başla
                </button>
              )}
              {status === 'preparing' && (
                <button 
                  onClick={() => onStatusChange(order.id, 'ready')}
                  className="flex-1 bg-green-600 text-white font-medium py-2 rounded-xl text-sm hover:bg-green-700 transition-colors"
                >
                  Hazır
                </button>
              )}
              {status === 'ready' && (
                <button 
                  onClick={() => onStatusChange(order.id, 'delivered')}
                  className="flex-1 bg-gray-200 text-gray-800 font-medium py-2 rounded-xl text-sm hover:bg-gray-300 transition-colors"
                >
                  Teslim Edildi
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
