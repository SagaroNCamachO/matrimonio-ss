import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { verifyAdminToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const description = (formData.get('description') as string) || 'Foto del matrimonio';

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No se proporcionó ningún archivo válido' }, { status: 400 });
    }

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const fileType = file.type?.toLowerCase() || '';
    if (!fileType || !validTypes.includes(fileType)) {
      return NextResponse.json(
        { error: `Tipo de archivo no válido (${file.type || 'desconocido'}). Solo se permiten: JPG, PNG, WEBP` },
        { status: 400 }
      );
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'El archivo es demasiado grande. Máximo 5MB' },
        { status: 400 }
      );
    }

    // Crear directorio si no existe
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    if (!existsSync(imagesDir)) {
      await mkdir(imagesDir, { recursive: true });
    }

    // Generar nombre único
    const timestamp = Date.now();
    const originalName = (file.name || 'foto').replace(/[^a-zA-Z0-9.-]/g, '_');
    // Asegurar que el nombre tenga extensión
    const hasExtension = originalName.includes('.');
    const fileName = hasExtension 
      ? `${timestamp}_${originalName}`
      : `${timestamp}_${originalName}.${fileType.split('/')[1] || 'jpg'}`;
    const filePath = path.join(imagesDir, fileName);

    // Convertir File a Buffer y guardar
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Retornar la ruta pública
    const publicPath = `/images/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicPath,
      path: publicPath,
      fileName: fileName,
      description: description,
    });
  } catch (error) {
    console.error('Error al subir archivo:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json(
      { error: `Error al subir el archivo: ${errorMessage}` },
      { status: 500 }
    );
  }
}
