// Script simple para verificar que todo esté instalado correctamente
console.log('🔍 Verificando instalación...\n');

// Verificar Node.js
try {
  const nodeVersion = process.version;
  console.log('✅ Node.js está instalado:', nodeVersion);
} catch (error) {
  console.log('❌ Node.js NO está instalado');
  console.log('   Ve a https://nodejs.org/ para instalarlo\n');
  process.exit(1);
}

// Verificar npm
try {
  const { execSync } = require('child_process');
  const npmVersion = execSync('npm --version', { encoding: 'utf-8' }).trim();
  console.log('✅ npm está instalado:', npmVersion);
} catch (error) {
  console.log('❌ npm NO está disponible');
  process.exit(1);
}

// Verificar si node_modules existe
const fs = require('fs');
const path = require('path');

if (fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('✅ Dependencias instaladas (node_modules existe)');
} else {
  console.log('⚠️  Dependencias NO instaladas');
  console.log('   Ejecuta: npm install\n');
}

console.log('\n✨ Verificación completada!\n');
console.log('📝 Próximos pasos:');
console.log('   1. Si falta algo, sigue las instrucciones');
console.log('   2. Ejecuta: npm install (si no lo has hecho)');
console.log('   3. Ejecuta: npm run dev');
console.log('   4. Abre: http://localhost:3000\n');



