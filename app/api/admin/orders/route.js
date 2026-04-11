import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase get orders error:', error);
      return NextResponse.json({ error: 'Failed to fetch orders.', orders: [] }, { status: 500 });
    }

    // Map snake_case back to camelCase for the frontend
    const mappedOrders = data.map((o) => ({
      id: o.id,
      customerName: o.customer_name,
      customerEmail: o.customer_email,
      customerPhone: o.customer_phone,
      items: o.items,
      total: parseFloat(o.total),
      pickupTime: o.pickup_time,
      status: o.status,
      createdAt: o.created_at,
    }));

    return NextResponse.json({ success: true, orders: mappedOrders });
  } catch (error) {
    console.error('Admin Orders API get error:', error);
    return NextResponse.json({ error: 'Internal server error.', orders: [] }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Order ID and status required.' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update order error:', error);
      return NextResponse.json({ error: 'Failed to update order status.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, order: data });
  } catch (error) {
    console.error('Admin Orders API patch error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
