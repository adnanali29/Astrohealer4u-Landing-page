import { NextResponse } from "next/server";
import { getAdminConfigFromDb, updateAdminConfigInDb } from "@/lib/db";

// GET: returns current configured adminId
export async function GET() {
  try {
    const config = await getAdminConfigFromDb();
    return NextResponse.json({
      success: true,
      adminId: config.adminId,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to read configuration";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// POST: Handles either "login" verification or "update" credentials in Neon DB
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;
    const config = await getAdminConfigFromDb();

    if (action === "login") {
      const { adminId, adminPassword } = body;
      if (
        String(adminId).trim() === config.adminId &&
        String(adminPassword) === config.adminPassword
      ) {
        return NextResponse.json({
          success: true,
          adminId: config.adminId,
        });
      }
      return NextResponse.json(
        { success: false, error: "Invalid Admin ID or Password." },
        { status: 401 }
      );
    }

    if (action === "update") {
      const { currentPassword, newAdminId, newPassword } = body;

      if (!currentPassword) {
        return NextResponse.json(
          { success: false, error: "Current password is required to make changes." },
          { status: 400 }
        );
      }

      if (String(currentPassword) !== config.adminPassword) {
        return NextResponse.json(
          { success: false, error: "Current password does not match." },
          { status: 403 }
        );
      }

      if (!newAdminId || !newAdminId.trim()) {
        return NextResponse.json(
          { success: false, error: "New Admin ID / Username cannot be empty." },
          { status: 400 }
        );
      }

      if (!newPassword || newPassword.length < 1) {
        return NextResponse.json(
          { success: false, error: "New password cannot be empty." },
          { status: 400 }
        );
      }

      await updateAdminConfigInDb(newAdminId.trim(), newPassword);

      return NextResponse.json({
        success: true,
        message: "Credentials saved successfully to Neon Database!",
        newAdminId: newAdminId.trim(),
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action specified." },
      { status: 400 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Operation failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
