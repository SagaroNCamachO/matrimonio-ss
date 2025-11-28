import { NextResponse } from 'next/server';
import { readDatabase, writeDatabase } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const fullName = body?.fullName?.trim();
  const phone = body?.phone?.trim();
  const email = body?.email?.trim();

  if (!fullName || !phone) {
    return NextResponse.json(
      { message: 'Nombre completo y número de teléfono son obligatorios' },
      { status: 400 },
    );
  }

  // Validar longitud de campos
  if (fullName.length > 200) {
    return NextResponse.json(
      { message: 'El nombre completo es demasiado largo (máximo 200 caracteres)' },
      { status: 400 },
    );
  }

  if (phone.length > 50) {
    return NextResponse.json(
      { message: 'El número de teléfono es demasiado largo' },
      { status: 400 },
    );
  }

  // Validar formato de email si se proporciona
  if (email) {
    if (email.length > 200) {
      return NextResponse.json(
        { message: 'El correo electrónico es demasiado largo' },
        { status: 400 },
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'El formato del correo electrónico no es válido' },
        { status: 400 },
      );
    }
  }

  // Sanitizar y formatear el nombre con mayúsculas iniciales
  // Remover caracteres peligrosos pero mantener acentos y espacios
  const sanitizedName = fullName.replace(/[<>\"'&]/g, '');
  const formattedName = sanitizedName
    .split(' ')
    .filter(word => word.length > 0)
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .substring(0, 200); // Limitar longitud final

  const database = readDatabase();
  
  // Buscar si ya existe un invitado con el mismo nombre o teléfono
  const existingByName = database.guests.find(
    (guest) => guest.name.toLowerCase() === formattedName.toLowerCase(),
  );
  
  const existingByPhone = database.guests.find(
    (guest) => guest.phone && guest.phone === phone,
  );

  if (existingByName) {
    // Actualizar invitado existente
    existingByName.confirmed = true;
    existingByName.phone = phone;
    if (email) {
      existingByName.email = email;
    }
  } else if (existingByPhone) {
    // Actualizar invitado existente por teléfono
    existingByPhone.name = formattedName;
    existingByPhone.confirmed = true;
    if (email) {
      existingByPhone.email = email;
    }
  } else {
    // Crear nuevo invitado
    database.guests.push({
      id: Date.now().toString(),
      name: formattedName,
      phone: phone,
      email: email || undefined,
      confirmed: true,
    });
  }

  writeDatabase(database);

  return NextResponse.json({
    message: '¡Gracias por confirmar tu asistencia! Te esperamos en nuestro día especial.',
  });
}

