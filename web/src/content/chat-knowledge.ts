/**
 * BASE DE CONOCIMIENTO EDITABLE DEL CHATBOT.
 *
 * Lo que escribas aquí se suma a lo que el asistente ya sabe del sitio (servicios, pasos, documentos, preguntas
 * frecuentes, ubicación y contacto). Se edita como texto normal; no hace falta saber programar:
 *   1. Escribe SOLO dentro de las comillas inclinadas (`) de abajo. No uses ese símbolo dentro del texto.
 *   2. Usa "## Título" para cada tema y debajo el contenido (puede ser en español; el asistente responde en el idioma de la persona).
 *   3. Escribe solo información VERDADERA y aprobada por la asesora: el asistente la repetirá a los clientes.
 *      Sin precios ni garantías, salvo que la asesora lo autorice. Nada de datos personales de clientes.
 *   4. Las líneas que contengan [PENDIENTE] y los comentarios <!-- así --> se ignoran: sirven para dejar tareas.
 *   5. Guarda, sube el cambio y reinicia/redespliega el sitio.
 * Tamaño recomendado: hasta unas 15 páginas de texto. Si crece mucho más, habría que cambiar de método.
 */
export const chatKnowledge = String.raw`

<!--
EJEMPLO del formato (bórralo o copia el estilo):

## Documentos para preparar taxes individuales
Para tu cita ten a la mano: identificación, SSN o ITIN de cada persona de la declaración, formularios W-2 y 1099,
y la declaración del año anterior si la tienes.

## ¿La asesora atiende fuera de Houston?
[Escribir aquí la respuesta real]
-->

## Horario de atención
[PENDIENTE: días y horas reales de atención]

## Dirección de la oficina
[PENDIENTE: dirección exacta y referencias para llegar]

## Sobre la asesora
[PENDIENTE: biografía y experiencia aprobadas por la asesora. No inventar credenciales.]

## Formas de pago
[PENDIENTE: métodos de pago aceptados, si la asesora quiere que el asistente los mencione]

## Temas que el asistente NO debe tratar
[PENDIENTE: cualquier tema que deba derivarse siempre a la asesora]

`;
