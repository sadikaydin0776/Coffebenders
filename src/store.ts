export interface OrderItem {
  name: string;
  quantity: number;
}

export interface OrderInput {
  tableNumber: string;
  orderType?: 'table' | 'takeaway';
  customerName?: string;
  items: OrderItem[];
  notes?: string;
  finalTotal?: number;
  discountApplied?: number;
}

interface Order extends OrderInput {
  id: string;
  status: string;
  createdAt: number;
  updatedAt: number;
}

// Mock state over local storage
let mockOrders: Order[] = [];
let listeners: ((orders: any[]) => void)[] = [];

function loadOrders() {
  try {
    const data = localStorage.getItem('mockOrders');
    if (data) {
      mockOrders = JSON.parse(data);
    }
  } catch (e) {
    // ignore
  }
}

function saveOrders() {
  try {
    localStorage.setItem('mockOrders', JSON.stringify(mockOrders));
  } catch (e) {
    // ignore
  }
  listeners.forEach(l => l([...mockOrders].sort((a,b) => b.createdAt - a.createdAt)));
}

loadOrders();

window.addEventListener('storage', (e) => {
  if (e.key === 'mockOrders') {
    loadOrders();
    listeners.forEach(l => l([...mockOrders].sort((a,b) => b.createdAt - a.createdAt)));
  }
});

export async function signInCustomer() {
  // Mock login: always succeeds immediately
  return { success: true };
}

export function subscribeToAuth(callback: (user: any | null) => void) {
  // Immediately return a mock user
  callback({ uid: 'mock-user' });
  return () => {};
}

export async function createOrder(input: OrderInput) {
  const newOrder: Order = {
    ...input,
    id: Math.random().toString(36).substring(2, 9),
    status: 'pending',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  mockOrders.push(newOrder);
  saveOrders();
}

export async function updateOrderStatus(orderId: string, status: string) {
  const order = mockOrders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    order.updatedAt = Date.now();
    saveOrders();
  }
}

export function subscribeToOrders(callback: (orders: any[]) => void) {
  listeners.push(callback);
  callback([...mockOrders].sort((a,b) => b.createdAt - a.createdAt));
  return () => {
    listeners = listeners.filter(l => l !== callback);
  };
}

