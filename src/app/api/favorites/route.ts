import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: Request) {
  const { book_id, title, authors, image_url } = await req.json();

  try {
    await pool.query(
      `INSERT INTO wishlist (book_id, title, authors, image_url)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (book_id) DO NOTHING`,
      [book_id, title, authors, image_url]
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Insert error:", e);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

export async function GET() {
  const res = await pool.query(`SELECT * FROM wishlist`);
  return NextResponse.json(res.rows);
}

export async function DELETE(req: Request) {
  const { book_id } = await req.json();

  try {
    await pool.query(`DELETE FROM wishlist WHERE book_id = $1`, [book_id]);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Delete error:", e);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
