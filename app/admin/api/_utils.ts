import { query, execute } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function safeRows<T extends Record<string, string | number | null>>(
  sql: string,
  params: Array<string | number | boolean | null> = []
): Promise<T[]> {
  try {
    return await query<T[]>(sql, params);
  } catch {
    return [];
  }
}

export async function safeCount(sql: string): Promise<number> {
  try {
    const rows = await query<Array<{ total: number }>>(sql);
    return Number(rows[0]?.total || 0);
  } catch {
    return 0;
  }
}

export async function handlePost(req: Request, tableName: string) {
  try {
    const body = await req.json();
    const keys = Object.keys(body).filter(k => k !== 'id' && k !== 'created_at' && k !== 'updated_at');
    if (keys.length === 0) throw new Error('No valid fields provided');
    
    const vals = keys.map(k => body[k]);
    const placeholders = keys.map(() => '?').join(', ');
    const columns = keys.map(k => `\`${k}\``).join(', ');
    
    await execute(`INSERT INTO \`${tableName}\` (${columns}) VALUES (${placeholders})`, vals);
    return NextResponse.json({ success: true, message: 'Record created successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Error creating record' }, { status: 500 });
  }
}

export async function handlePut(req: Request, tableName: string) {
  try {
    const body = await req.json();
    if (!body.id) throw new Error('ID is required for update');
    
    const id = body.id;
    const keys = Object.keys(body).filter(k => k !== 'id' && k !== 'created_at' && k !== 'updated_at');
    if (keys.length === 0) throw new Error('No valid fields provided to update');

    const vals = keys.map(k => body[k]);
    const sets = keys.map(k => `\`${k}\` = ?`).join(', ');
    vals.push(id);
    
    await execute(`UPDATE \`${tableName}\` SET ${sets} WHERE id = ?`, vals);
    return NextResponse.json({ success: true, message: 'Record updated successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Error updating record' }, { status: 500 });
  }
}

export async function handleDelete(req: Request, tableName: string) {
  try {
    const body = await req.json();
    if (!body.id) throw new Error('ID is required for delete');
    
    await execute(`DELETE FROM \`${tableName}\` WHERE id = ?`, [body.id]);
    return NextResponse.json({ success: true, message: 'Record deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Error deleting record' }, { status: 500 });
  }
}
