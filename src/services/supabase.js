import { initialSeedData } from './db';

// Safely try to get Supabase details, fallback to mock store
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';

class MockSupabaseService {
  constructor() {
    this.storageKey = 'linguaverse_store';
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(initialSeedData));
    }
    
    // Auth fallback state
    this.authKey = 'linguaverse_user';
    if (!localStorage.getItem(this.authKey)) {
      const defaultUser = {
        id: 'usr-123',
        email: 'lukas.vance@example.com',
        user_metadata: {
          full_name: 'Lukas Vance',
          level_polyglot: 12,
          avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS7VKTQ55iZqNIzIJlmtYQu37u2m_hir0HoQrxtSX6A_ajqsXyNhKv5bpfEfgIt8Oo-8ssr49ilyUNiK9G1QO-VAmQnWsjyHjPWGoHjtuGE1MqfAFrOK97A3083U2xH1YZNPkSEUZ-odoluPP9SD9NhAotpiZ1zv0NbywUFuZgs0X1sUYHaWaLbiVUnx4pbr3DpAnMwfRSuzBcTgvkJ8ZbtcpberrQae4oaZkihsbD0Uri_YeuJmZWD-SLl5X15DMdoJC-_dgjvu0',
          preferred_language: 'kodava',
          role: 'admin' // Enable admin views for testing out-of-the-box!
        }
      };
      localStorage.setItem(this.authKey, JSON.stringify(defaultUser));
    }
  }

  getData() {
    return JSON.parse(localStorage.getItem(this.storageKey));
  }

  saveData(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  // Authentication API
  auth = {
    getUser: async () => {
      const u = localStorage.getItem(this.authKey);
      return { data: { user: u ? JSON.parse(u) : null }, error: null };
    },
    signUp: async ({ email, password, options }) => {
      const newUser = {
        id: 'usr-' + Math.random().toString(36).substr(2, 9),
        email,
        user_metadata: {
          full_name: options?.data?.full_name || email.split('@')[0],
          level_polyglot: 1,
          preferred_language: options?.data?.preferred_language || 'kodava',
          avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          role: 'student'
        }
      };
      localStorage.setItem(this.authKey, JSON.stringify(newUser));
      return { data: { user: newUser }, error: null };
    },
    signInWithPassword: async ({ email, password }) => {
      // Simulate login
      const u = localStorage.getItem(this.authKey);
      if (u) {
        const user = JSON.parse(u);
        user.email = email; // override for demo
        localStorage.setItem(this.authKey, JSON.stringify(user));
        return { data: { user }, error: null };
      }
      return { data: { user: null }, error: new Error('User not found') };
    },
    signOut: async () => {
      localStorage.removeItem(this.authKey);
      return { error: null };
    },
    updateUser: async ({ data }) => {
      const u = localStorage.getItem(this.authKey);
      if (u) {
        const user = JSON.parse(u);
        user.user_metadata = { ...user.user_metadata, ...data };
        localStorage.setItem(this.authKey, JSON.stringify(user));
        return { data: { user }, error: null };
      }
      return { error: new Error('No user logged in') };
    }
  };

  // Database standard CRUD operations mimicking Supabase Client
  from(table) {
    const data = this.getData();
    return {
      select: () => {
        return {
          data: data[table] || [],
          error: null,
          single: () => ({ data: (data[table] || [])[0], error: null }),
          eq: (field, val) => {
            const filtered = (data[table] || []).filter(item => item[field] === val);
            return { data: filtered, error: null, single: () => ({ data: filtered[0] || null, error: null }) };
          }
        };
      },
      insert: async (rows) => {
        const toInsert = Array.isArray(rows) ? rows : [rows];
        if (!data[table]) data[table] = [];
        data[table].push(...toInsert);
        this.saveData(data);
        return { data: toInsert, error: null };
      },
      update: async (updates) => {
        return {
          eq: (field, val) => {
            if (data[table]) {
              data[table] = data[table].map(item => {
                if (item[field] === val) {
                  return { ...item, ...updates };
                }
                return item;
              });
              this.saveData(data);
            }
            return { data: updates, error: null };
          }
        };
      },
      delete: async () => {
        return {
          eq: (field, val) => {
            if (data[table]) {
              data[table] = data[table].filter(item => item[field] !== val);
              this.saveData(data);
            }
            return { error: null };
          }
        };
      }
    };
  }

  // Realtime subscription simulation
  channel(name) {
    return {
      on: (type, filter, callback) => {
        // Mock realtime by registering callbacks in a local registry
        if (!window.__supabaseMockChannels) window.__supabaseMockChannels = {};
        if (!window.__supabaseMockChannels[name]) window.__supabaseMockChannels[name] = [];
        window.__supabaseMockChannels[name].push({ type, filter, callback });
        return {
          subscribe: () => {
            console.log(`Subscribed to mock Supabase channel: ${name}`);
            return {
              unsubscribe: () => {
                window.__supabaseMockChannels[name] = window.__supabaseMockChannels[name].filter(c => c.callback !== callback);
              }
            };
          }
        };
      }
    };
  }

  // Method to trigger fake realtime broadcasts
  broadcast(channelName, event, payload) {
    const subs = window.__supabaseMockChannels?.[channelName] || [];
    subs.forEach(s => {
      if (s.type === 'broadcast' && s.filter.event === event) {
        s.callback({ event, payload });
      }
    });
  }
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? { /* Real Supabase Client placeholder - would be imported from @supabase/supabase-js */ }
  : new MockSupabaseService();
