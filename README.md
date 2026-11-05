# Portafolio · Isaac Martínez Ríos

Sitio en vivo: <https://isaacmartinez.space>

Portafolio bilingüe (español / inglés) con tres casos de estudio de análisis y ciencia de datos:

- [Pronóstico de demanda y política de inventario](https://isaacmartinez.space/proyectos/demanda-inventario/)
- [Precios de la canasta QQP (PROFECO)](https://isaacmartinez.space/proyectos/canasta-qqp/)
- [ECOBICI: dónde faltan bicicletas y a qué hora](https://isaacmartinez.space/proyectos/ecobici/)

Además incluye un archivo de dashboards anteriores (Tableau y Looker Studio), la formación y el contacto.

## Estructura

```
index.html                   Inicio: portada, casos, método, archivo, sobre mí, contacto
proyectos/<caso>/index.html  Un caso de estudio por proyecto
css/site.css                 Estilos y tokens de diseño
js/site.js                   Selector de idioma y gráficas en SVG
data/figures.json            Datos de las gráficas, extraídos de cada repositorio
assets/img/                  Imágenes optimizadas (WebP) e imagen para redes (og.png)
sobre_mi.html, proyectos.html, contacto.html   Redirecciones de las URLs anteriores
PRODUCT.md, DESIGN.md        Contexto del producto y sistema visual
```

Es HTML, CSS y JavaScript sin dependencias ni paso de compilación. Para verlo en local:

```bash
python -m http.server 8765
```

## Idiomas

Cada texto aparece dos veces, con `lang="es"` y `lang="en"`. El botón ES/EN cambia el idioma y guarda la elección en el navegador. Si no hay una elección guardada, se usa el idioma del navegador.

## Dashboards de los proyectos

Los dashboards en vivo se publican desde sus propios repositorios en
[`/Pronostico-de-Demanda-y-Politica-de-Inventario/`](https://isaacmartinez.space/Pronostico-de-Demanda-y-Politica-de-Inventario/),
[`/analisis_profeco/`](https://isaacmartinez.space/analisis_profeco/) y
[`/ecobici/`](https://isaacmartinez.space/ecobici/).
