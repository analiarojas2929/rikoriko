#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.units import inch, cm
from reportlab.platypus import (
    SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, 
    PageBreak, Image, KeepTogether, Frame, PageTemplate
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

def crear_carta_pdf():
    """Genera el PDF de la carta de Riko Riko"""
    
    # Configuración del documento
    filename = "Menu_RikoRiko.pdf"
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        rightMargin=1.5*cm,
        leftMargin=1.5*cm,
        topMargin=1.2*cm,
        bottomMargin=1.2*cm
    )
    
    # Contenedor para elementos
    elements = []
    
    # Estilos
    styles = getSampleStyleSheet()
    
    # Estilo personalizado para el título principal
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=36,
        textColor=colors.HexColor('#FF6B35'),
        spaceAfter=0,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    subtitle_style = ParagraphStyle(
        'Subtitle',
        parent=styles['Normal'],
        fontSize=14,
        textColor=colors.HexColor('#D2691E'),
        spaceBefore=2,
        spaceAfter=10,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    category_style = ParagraphStyle(
        'Category',
        parent=styles['Heading2'],
        fontSize=16,
        textColor=colors.white,
        spaceBefore=12,
        spaceAfter=8,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold',
        backColor=colors.HexColor('#D2691E'),
        borderPadding=10,
        leading=20
    )
    
    item_name_style = ParagraphStyle(
        'ItemName',
        parent=styles['Normal'],
        fontSize=11,
        textColor=colors.black,
        fontName='Helvetica-Bold',
        spaceBefore=2,
        spaceAfter=2
    )
    
    item_desc_style = ParagraphStyle(
        'ItemDesc',
        parent=styles['Normal'],
        fontSize=9,
        textColor=colors.HexColor('#333333'),
        fontName='Helvetica',
        spaceBefore=0,
        spaceAfter=2,
        leading=11
    )
    
    price_style = ParagraphStyle(
        'Price',
        parent=styles['Normal'],
        fontSize=14,
        textColor=colors.HexColor('#FF6B35'),
        fontName='Helvetica-Bold',
        alignment=TA_RIGHT
    )
    
    info_style = ParagraphStyle(
        'Info',
        parent=styles['Normal'],
        fontSize=9,
        textColor=colors.HexColor('#555555'),
        fontName='Helvetica',
        alignment=TA_CENTER,
        spaceBefore=3,
        spaceAfter=3
    )
    
    # ===== ENCABEZADO RETRO =====
    # Crear el header completo como una tabla con bordes retro
    emoji_style = ParagraphStyle(
        'Emoji',
        parent=styles['Normal'],
        fontSize=14,
        textColor=colors.HexColor('#D2691E'),
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    logo_style = ParagraphStyle(
        'Logo',
        parent=styles['Heading1'],
        fontSize=42,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold',
        leading=50
    )
    
    menu_title_style = ParagraphStyle(
        'MenuTitle',
        parent=styles['Heading2'],
        fontSize=24,
        textColor=colors.HexColor('#D2691E'),
        alignment=TA_CENTER,
        fontName='Helvetica-Bold',
        spaceAfter=5,
        spaceBefore=5
    )
    
    contact_info_style = ParagraphStyle(
        'ContactInfo',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.HexColor('#1a1a1a'),
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    # Contenido del header
    header_data = [
        [Paragraph("* * * * *", emoji_style)],
        [Paragraph('<font color="#FF6B35">Riko</font><font color="#D2691E">Riko</font>', logo_style)],
        [Paragraph("***", emoji_style)],
        [Paragraph('<font color="white"><b>FAST FOOD CART</b></font>', 
                  ParagraphStyle('Badge', parent=styles['Normal'], fontSize=10, alignment=TA_CENTER, 
                               fontName='Helvetica-Bold', backColor=colors.HexColor('#FF6B35'), 
                               borderPadding=5))],
        [Spacer(1, 0.2*cm)],
        [Paragraph("• MENÚ •", menu_title_style)],
        [Spacer(1, 0.1*cm)],
        [Paragraph("Tel/WhatsApp: +56 9 4687 6119", contact_info_style)],
        [Paragraph("Direccion: El vergel alto 1936, Valparaíso", contact_info_style)]
    ]
    
    header_table = Table(header_data, colWidths=[16*cm])
    header_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#FFFAF0')),
        ('BOX', (0, 0), (-1, -1), 4, colors.HexColor('#D2691E')),
        ('LINEBELOW', (0, 0), (-1, 0), 2, colors.HexColor('#D2691E')),
        ('LINEBELOW', (0, 5), (-1, 5), 2, colors.HexColor('#D2691E')),
        ('ROUNDEDCORNERS', [15, 15, 15, 15]),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    elements.append(header_table)
    
    # Separador - Nueva página después del header
    elements.append(PageBreak())
    
    # ===== MENÚ DE PRODUCTOS =====
    
    # Función auxiliar para crear items de menú (diseño vertical)
    def crear_item_menu(nombre, descripcion, precio):
        """Crea una tabla para un item del menú en formato vertical"""
        # Estilo para el precio en caja
        price_box_style = ParagraphStyle(
            'PriceBox',
            parent=styles['Normal'],
            fontSize=16,
            textColor=colors.HexColor('#FF6B35'),
            fontName='Helvetica-Bold',
            alignment=TA_RIGHT
        )
        
        item_data = [
            [Paragraph(f'<b>{nombre}</b>', item_name_style)],
            [Paragraph(descripcion, item_desc_style)],
            [Spacer(1, 0.15*cm)],
            [Paragraph(precio, price_box_style)]
        ]
        
        item_table = Table(item_data, colWidths=[16*cm])
        item_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.white),
            ('BOX', (0, 0), (-1, -1), 3, colors.HexColor('#FF6B35')),
            ('ROUNDEDCORNERS', [10, 10, 10, 10]),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('TOPPADDING', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
            ('LEFTPADDING', (0, 0), (-1, -1), 12),
            ('RIGHTPADDING', (0, 0), (-1, -1), 12),
            # Fondo degradado simulado para el precio
            ('BACKGROUND', (0, 3), (-1, 3), colors.HexColor('#FFE8CC')),
            ('BOX', (0, 3), (-1, 3), 2, colors.HexColor('#FF6B35')),
            ('ROUNDEDCORNERS', [8, 8, 8, 8]),
        ]))
        
        return item_table
    
    def crear_categoria(titulo, items_lista):
        """Crea una categoría completa con sus items"""
        categoria_elements = []
        
        # Título de categoría con diseño retro
        cat_title_style = ParagraphStyle(
            'CategoryTitle',
            parent=styles['Heading2'],
            fontSize=18,
            textColor=colors.HexColor('#D2691E'),
            alignment=TA_CENTER,
            fontName='Helvetica-Bold',
            spaceBefore=5,
            spaceAfter=5
        )
        
        cat_table = Table([[Paragraph(f'<b>{titulo}</b>', cat_title_style)]], colWidths=[16*cm])
        cat_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#FFE8CC')),
            ('BOX', (0, 0), (-1, -1), 3, colors.HexColor('#D2691E')),
            ('LINEBELOW', (0, 0), (-1, -1), 3, colors.HexColor('#D2691E')),
            ('ROUNDEDCORNERS', [10, 10, 10, 10]),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('TOPPADDING', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ]))
        categoria_elements.append(cat_table)
        categoria_elements.append(Spacer(1, 0.4*cm))
        
        # Items
        for nombre, desc, precio in items_lista:
            categoria_elements.append(crear_item_menu(nombre, desc, precio))
            categoria_elements.append(Spacer(1, 0.25*cm))
        
        return categoria_elements
    
    # COMPLETOS (Primera categoría, sin PageBreak)
    elements.extend(crear_categoria(">> COMPLETOS", [
        ("Completo Chico (10 cm)", 
         "Italiano clásico: palta, tomate y mayo casera. \"Completo\" con chucrut o salsa americana, a elección.",
         "$1.000"),
        ("Completo Mediano (20 cm)",
         "Italiano bien rellenito (palta fresquita, tomate picado y mayo). O versión completa con chucrut o salsa americana.",
         "$2.000"),
        ("Completo Gigante (30 cm)",
         "Italiano XL con más palta y tomate. También disponible estilo completo con chucrut o salsa americana.",
         "$3.000"),
    ]))
    
    # Nueva página para SÁNDWICHES (Parte 1)
    elements.append(PageBreak())
    
    # SÁNDWICHES - Parte 1
    elements.extend(crear_categoria(">> SÁNDWICHES", [
        ("Ave Mayo Individual", "Pollito desmenuzado con mayonesa casera bien cremosa.", "$4.500"),
        ("Ave Italiano Individual", "Pollo desmenuzado con palta, tomate y mayo casera.", "$4.500"),
        ("Churrasco Italiano Individual", "Carne a la plancha con palta, tomate y mayo.", "$4.500"),
        ("Barros Luco Individual", "Churrasco con queso derretido.", "$4.500"),
    ]))
    
    # Nueva página para SÁNDWICHES (Parte 2)
    elements.append(PageBreak())
    
    # SÁNDWICHES - Parte 2 (Hallullones)
    elements.extend(crear_categoria(">> SÁNDWICHES (HALLULLONES)", [
        ("Hallullón Italiano Grande", "Hallulla grande con churrasco, queso y mezcla italiana (palta + tomate + mayo).", "$13.000"),
        ("Hallullón Barros Luco Grande", "Hallulla grande con churrasco y queso derretido.", "$15.000"),
        ("Hallullón Chacarero Grande", "Hallulla grande con churrasco, tomate, porotos verdes y ají verde.", "$16.000"),
    ]))
    
    # Nueva página para CHORRILLANAS
    elements.append(PageBreak())
    
    # CHORRILLANAS
    elements.extend(crear_categoria(">> CHORRILLANAS", [
        ("Chorrillana Chica", "Papas fritas caseras con carne a la plancha, cebolla salteada y huevos fritos.", "$12.000"),
        ("Chorrillana Grande", "Versión gigante: más papas, más carne, más cebolla y más huevos. Ideal para compartir.", "$18.000"),
    ]))
    
    # Nueva página para EMPANADAS
    elements.append(PageBreak())
    
    # EMPANADAS
    elements.extend(crear_categoria(">> EMPANADAS", [
        ("Empanada de Queso", "Quesito bien derretido en masa frita crocante.", "$1.400"),
        ("Empanada de Jamón y Queso", "Clásica de picá: jamón y queso calentitos en masa frita.", "$1.600"),
        ("Empanada Napolitana", "Jamón, queso, tomate y orégano al estilo napolitano, frita al momento.", "$1.800"),
        ("Empanada de Pollo y Queso", "Pollito desmenuzado con queso derretido en masa frita doradita.", "$2.000"),
    ]))
    
    # Nueva página para PAPAS FRITAS
    elements.append(PageBreak())
    
    # PAPAS FRITAS
    elements.extend(crear_categoria(">> PAPAS FRITAS", [
        ("Papas Fritas Chicas", "Porción individual de papas fritas naturales, crujientes y recién hechas.", "$2.000"),
        ("Papas Fritas Medianas", "Porción mediana de papas naturales doraditas, ideales para acompañar.", "$3.500"),
        ("Papas Fritas Grandes", "Porción grande de papas naturales, perfectas para compartir.", "$5.500"),
    ]))
    
    # Nueva página para SALCHIPAPAS
    elements.append(PageBreak())
    
    # SALCHIPAPAS
    elements.extend(crear_categoria(">> SALCHIPAPAS", [
        ("Salchipapa Chica", "Papas fritas con trozos de salchicha, aderezos y salsas.", "$3.500"),
        ("Salchipapa Grande", "Porción grande de papas fritas con salchicha, perfecta para compartir.", "$5.500"),
    ]))
    
    # Nueva página para HAMBURGUESAS
    elements.append(PageBreak())
    
    # HAMBURGUESAS
    elements.extend(crear_categoria(">> HAMBURGUESAS", [
        ("Hamburguesa", "Hamburguesa clásica con carne, lechuga, tomate y salsas.", "$5.000"),
        ("Hamburguesa con Papas Fritas", "Hamburguesa completa acompañada de papas fritas.", "$6.500"),
    ]))
    
    # Nueva página para BEBIDAS
    elements.append(PageBreak())
    
    # BEBIDAS
    elements.extend(crear_categoria(">> BEBIDAS", [
        ("Cocacola express (237 ml)", "Coca-Cola formato individual.", "$600"),
        ("Gaseosa (350 ml)", "Pepsi, Canada drive, Kem, Bilz, Pap, Limon soda Fanta — formato individual.", "$1.200"),
        ("Coca-Cola (591 ml)", "Botella mediana, bien heladita.", "$1.600"),
        ("Bebida Familiar (3 Litros)", "Coca-Cola, Canada drive, Kem, Pepsi, Bilz, Pap, Limon soda — ideal para compartir.", "$3.000"),

        ("Agua Cachantún", "Agua mineral sin gas o con gas.", "$1.400"),
    ]))
    
    # ===== PÁGINA DE HORARIO =====
    elements.append(PageBreak())
    
    elements.append(Spacer(1, 2*cm))
    
    # Horario de atención
    horario_table_title = Table([[Paragraph(">> HORARIO DE ATENCIÓN", category_style)]], colWidths=[16*cm])
    horario_table_title.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#D2691E')),
        ('ROUNDEDCORNERS', [10, 10, 10, 10]),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    elements.append(horario_table_title)
    elements.append(Spacer(1, 0.3*cm))
    
    horario_data = [
        [Paragraph("* Martes a Jueves: 10:00 AM - 22:00 PM", info_style)],
        [Paragraph("* Viernes y Sábado: 18:00 PM - 2:00 AM", info_style)],
        [Paragraph("* Domingo: 18:00 PM - 22:00 PM", info_style)],
        [Paragraph('* <font color="#FF6B35"><b>Lunes: CERRADO</b></font>', info_style)],
    ]
    
    horario_table = Table(horario_data, colWidths=[16*cm])
    horario_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#FFE8CC')),
        ('BOX', (0, 0), (-1, -1), 2, colors.HexColor('#D2691E')),
        ('ROUNDEDCORNERS', [10, 10, 10, 10]),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    elements.append(horario_table)
    elements.append(Spacer(1, 1*cm))
    
    # Redes sociales
    redes_table_title = Table([[Paragraph(">> SÍGUENOS EN REDES", category_style)]], colWidths=[16*cm])
    redes_table_title.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#D2691E')),
        ('ROUNDEDCORNERS', [10, 10, 10, 10]),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    elements.append(redes_table_title)
    elements.append(Spacer(1, 0.3*cm))
    
    redes_data = [
        [Paragraph("<b>Instagram:</b> @riko.clacruz", info_style)],
        [Paragraph("<b>Facebook:</b> riko.riko.cerro.cruz", info_style)],
        [Paragraph("<b>WhatsApp:</b> +56 9 4687 6119", info_style)],
    ]
    
    redes_table = Table(redes_data, colWidths=[16*cm])
    redes_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.white),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor('#FFC107')),
        ('ROUNDEDCORNERS', [10, 10, 10, 10]),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    elements.append(redes_table)
    elements.append(Spacer(1, 2*cm))
    
    # Copyright
    copyright_style = ParagraphStyle(
        'Copyright',
        parent=styles['Normal'],
        fontSize=8,
        textColor=colors.HexColor('#888888'),
        alignment=TA_CENTER,
        fontName='Helvetica'
    )
    elements.append(Paragraph("© 2025 Riko Riko - Todos los derechos reservados", copyright_style))
    
    # Generar PDF
    doc.build(elements)
    print(f"✅ PDF generado exitosamente: {filename}")
    return filename

if __name__ == "__main__":
    crear_carta_pdf()