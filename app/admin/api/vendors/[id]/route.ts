import { NextRequest, NextResponse } from 'next/server';
import { execute } from '@/app/lib/db';

export const runtime = 'nodejs';

function hasSelectRows(result: unknown): boolean {
  if (!Array.isArray(result)) return false;
  if (result.length > 0 && Array.isArray(result[0])) return (result[0] as unknown[]).length > 0;
  return result.length > 0;
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await context.params;
    console.log('=== DELETE VENDOR DEBUG ===');
    console.log('Vendor ID string:', idParam);
    console.log('Vendor ID type:', typeof idParam);
    
    const id = parseInt(idParam);
    console.log('Parsed ID:', id);
    console.log('Parsed ID type:', typeof id);
    console.log('Is NaN:', isNaN(id));
    
    if (!idParam || idParam === 'undefined' || idParam === 'null') {
      throw new Error('Vendor ID is missing or invalid');
    }
    
    if (isNaN(id) || id <= 0) {
      throw new Error(`Invalid vendor ID: ${idParam}`);
    }
    
    // First check if vendor exists
    const checkResult = await execute(
      'SELECT id FROM vendor_registrations WHERE id = ?',
      [id]
    );
    
    console.log('Vendor check result:', checkResult);
    
    if (!hasSelectRows(checkResult)) {
      throw new Error(`Vendor not found with ID: ${id}`);
    }
    
    console.log('Vendor found, proceeding with deletion...');
    
    // Delete the vendor
    const result = await execute(
      'DELETE FROM vendor_registrations WHERE id = ?',
      [id]
    );
    
    console.log('Delete result:', result);
    console.log('=== END DELETE VENDOR DEBUG ===');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Vendor deleted successfully' 
    });
    
  } catch (error) {
    console.error('Delete vendor error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Error deleting vendor' 
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await context.params;
    console.log('=== UPDATE VENDOR DEBUG ===');
    console.log('Vendor ID to update:', idParam);
    
    const id = parseInt(idParam);
    if (isNaN(id)) {
      throw new Error('Invalid vendor ID');
    }
    
    const body = await request.json();
    console.log('Update data:', body);
    
    // Check if vendor exists
    const checkResult = await execute(
      'SELECT id FROM vendor_registrations WHERE id = ?',
      [id]
    );
    
    if (!hasSelectRows(checkResult)) {
      throw new Error('Vendor not found');
    }
    
    // Build dynamic update query
    const updateFields = [];
    const updateValues = [];
    
    // Only update fields that are provided
    if (body.company_name !== undefined) {
      updateFields.push('company_name = ?');
      updateValues.push(body.company_name);
    }
    if (body.email !== undefined) {
      updateFields.push('email = ?');
      updateValues.push(body.email);
    }
    if (body.phone !== undefined) {
      updateFields.push('phone = ?');
      updateValues.push(body.phone);
    }
    if (body.vendor_status !== undefined) {
      updateFields.push('vendor_status = ?');
      updateValues.push(body.vendor_status);
    }
    if (body.first_name !== undefined) {
      updateFields.push('first_name = ?');
      updateValues.push(body.first_name);
    }
    if (body.last_name !== undefined) {
      updateFields.push('last_name = ?');
      updateValues.push(body.last_name);
    }
    if (body.contact_person !== undefined) {
      updateFields.push('contact_person = ?');
      updateValues.push(body.contact_person);
    }
    if (body.designation !== undefined) {
      updateFields.push('designation = ?');
      updateValues.push(body.designation);
    }
    if (body.address !== undefined) {
      updateFields.push('address = ?');
      updateValues.push(body.address);
    }
    if (body.state !== undefined) {
      updateFields.push('state = ?');
      updateValues.push(body.state);
    }
    if (body.city !== undefined) {
      updateFields.push('city = ?');
      updateValues.push(body.city);
    }
    if (body.country !== undefined) {
      updateFields.push('country = ?');
      updateValues.push(body.country);
    }
    if (body.gst_no !== undefined) {
      updateFields.push('gst_no = ?');
      updateValues.push(body.gst_no);
    }
    if (body.landline !== undefined) {
      updateFields.push('landline = ?');
      updateValues.push(body.landline);
    }
    if (body.website !== undefined) {
      updateFields.push('website = ?');
      updateValues.push(body.website);
    }
    if (body.message !== undefined) {
      updateFields.push('message = ?');
      updateValues.push(body.message);
    }
    if (body.exclusive_offers !== undefined) {
      updateFields.push('exclusive_offers = ?');
      updateValues.push(body.exclusive_offers ? 1 : 0);
    }
    
    if (updateFields.length === 0) {
      throw new Error('No valid fields to update');
    }
    
    updateValues.push(id); // Add ID for WHERE clause
    
    const updateQuery = `UPDATE vendor_registrations SET ${updateFields.join(', ')} WHERE id = ?`;
    console.log('Update query:', updateQuery);
    console.log('Update values:', updateValues);
    
    const result = await execute(updateQuery, updateValues);
    console.log('Update result:', result);
    console.log('=== END UPDATE VENDOR DEBUG ===');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Vendor updated successfully' 
    });
    
  } catch (error) {
    console.error('Update vendor error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Error updating vendor' 
    }, { status: 500 });
  }
}
