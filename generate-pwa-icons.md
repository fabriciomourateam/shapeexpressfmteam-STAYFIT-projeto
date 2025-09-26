# Gerar Ícones para PWA

Para que o PWA funcione corretamente, você precisa criar os seguintes ícones na pasta `public/icons/`:

## Ícones Necessários:

1. **icon-16x16.png** - 16x16px
2. **icon-32x32.png** - 32x32px  
3. **icon-72x72.png** - 72x72px
4. **icon-96x96.png** - 96x96px
5. **icon-128x128.png** - 128x128px
6. **icon-144x144.png** - 144x144px
7. **icon-152x152.png** - 152x152px
8. **icon-192x192.png** - 192x192px
9. **icon-384x384.png** - 384x384px
10. **icon-512x512.png** - 512x512px

## Como criar:

### Opção 1: Usando ferramenta online
1. Acesse: https://realfavicongenerator.net/
2. Faça upload de uma imagem 512x512px do logo do Shape Express
3. Configure as opções de PWA
4. Baixe o pacote e extraia os ícones para `public/icons/`

### Opção 2: Usando o favicon.jpeg existente
1. Use o arquivo `public/favicon.jpeg` como base
2. Redimensione para cada tamanho necessário
3. Salve como PNG com os nomes especificados

### Opção 3: Usando Photoshop/GIMP
1. Abra o favicon.jpeg
2. Redimensione para cada tamanho (16x16, 32x32, etc.)
3. Exporte como PNG
4. Salve na pasta `public/icons/`

## Estrutura de pastas final:
```
public/
├── icons/
│   ├── icon-16x16.png
│   ├── icon-32x32.png
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
├── manifest.json
├── sw.js
└── browserconfig.xml
```

## Teste após criar os ícones:
1. Execute `npm run dev`
2. Acesse no celular
3. No Chrome/Safari, aparecerá a opção "Adicionar à tela inicial"
4. O app será instalado como um aplicativo nativo
