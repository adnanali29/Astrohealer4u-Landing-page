import { NextResponse } from "next/server";
import {
  getBookingsFromDb,
  insertBookingToDb,
  updateBookingStatusInDb,
  deleteBookingFromDb,
  getNextBookingId,
  type Booking,
} from "@/lib/db";

export type BookingRecord = Booking;

// GET all bookings from Neon DB
export async function GET() {
  try {
    const bookings = await getBookingsFromDb();
    return NextResponse.json({ success: true, bookings });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load bookings";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// POST new booking to Neon DB
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, error: "Name and Phone are required." },
        { status: 400 }
      );
    }

    // Generate sequential ID: AH4U-01, AH4U-02 ... AH4U-n
    const bookingId = body.id && String(body.id).startsWith("AH4U-")
      ? body.id
      : await getNextBookingId();

    const newBooking: Booking = {
      id: bookingId,
      name: String(body.name).trim(),
      consultation: body.consultation || "General Natal Consultation",
      dob: body.dob || "",
      tob: body.tob || "",
      pob: body.pob || "",
      phone: String(body.phone).trim(),
      appointmentDate: body.appointmentDate || "",
      appointmentTime: body.appointmentTime || "",
      email: body.email ? String(body.email).trim() : "",
      status: "Pending",
      source: body.source || "Hero Form (Book 1-on-1 Guidance)",
      createdAt: new Date().toISOString(),
      notes: body.notes || "",
    };

    const saved = await insertBookingToDb(newBooking);

    return NextResponse.json({ success: true, booking: saved }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save booking";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// PATCH to update booking status in Neon DB
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Booking ID is required" },
        { status: 400 }
      );
    }

    await updateBookingStatusInDb(id, status, notes);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update booking";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// DELETE to remove booking from Neon DB
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Booking ID is required" },
        { status: 400 }
      );
    }

    await deleteBookingFromDb(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete booking";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
