import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver'; 
import ExcelJS from 'exceljs';


export function exportToExcel(data, fileName) {
    // Crear un nuevo libro de trabajo
    const wb = XLSX.utils.book_new();

    // Convertir los datos a formato de hoja de trabajo de Excel
    const ws = XLSX.utils.json_to_sheet(data);

    ws['!cols'] = [{wch:10}, {wch:50}, {wch:20},{wch:20},{wch:20},{wch:10},{wch:10}]

    // Añadir la hoja de trabajo al libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Escribir el libro de trabajo en formato binario
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    // Crear un blob a partir de los datos binarios
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

    // Guardar el blob como un archivo Excel
    saveAs(blob, fileName);
}

// Función auxiliar para convertir los datos a formato binario
function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

export const exportFileXLSX = async (cart) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Items');

    // Añadir los datos al archivo
    worksheet.columns = [
        { header: '(*) Codigo', key: 'codigo', width: 10 },
        { header: 'Observaciones', key: 'observacion', width: 20 },
        { header: '(*) Especificaciones Tecnicas', key: 'especificacionestecnicas', width: 20 },
        { header: '(*) Acondicionamiento', key: 'acondicionamiento', width: 20 },
        { header: '(*) Cantidad',  key: 'cantidad', width: 10 },
        { header: '(*) Precio Estimado Unitario', key: 'pue', width: 15 },
        { header: 'Descripcion', key: 'descripcion', width: 50 },
    ];

    cart.forEach(item => {
        worksheet.addRow({
            codigo: `${item.codClase}-${item.itemCod}`,
            observacion: item.observacion || "",
            especificacionestecnicas: "",
            acondicionamiento: "",
            cantidad: 1,
            pue: 0,
            descripcion: item.descripcion
        });
    });

    // Ajustar el alto de la fila de encabezados
    worksheet.getRow(1).height = 50;

    // Ajustar el texto y centrar el contenido de la fila de encabezados
    worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF963634' } // Color bordó medio clarito
        };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        cell.font = {
            color: { argb: 'FFFFFFFF' },
            name: 'Aptos'
    }   });

    // Formato de moneda
    let priceColumn = worksheet.getColumn(worksheet.columns.length - 1);
    priceColumn.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
        cell.numFmt = '$ #,##0.00; [Red]-$ #,##0.00';
    });

    // Bordes de tabla
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                cell.border = {
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                };
                cell.font = {
                    name: 'Aptos'
                };
            });
        }

    });

    // Marcar el borde inferior de la última fila
    let lastRow = worksheet.getRow(worksheet.rowCount);
    lastRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
            ...cell.border,
            bottom: { style: 'thin' }
        };
    });

    // Generar el archivo Excel como un ArrayBuffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Crear un Blob a partir del ArrayBuffer
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Guardar el Blob como un archivo Excel
    saveAs(blob, 'Items_Template.xlsx');
}