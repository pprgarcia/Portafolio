import React, { useState, useEffect } from "react";
import {
  BarChart3,
  Database,
  TrendingUp,
  Mail,
  Linkedin,
  Github,
  Award,
  ExternalLink,
  Phone,
  X,
} from "lucide-react";

const ProjectModal = ({ project, onClose }) => {
  const [zoomImage, setZoomImage] = useState(null);

  if (!project.detailedInfo) {
    window.open(project.link, "_blank");
    onClose();
    return null;
  }

  const details = project.detailedInfo;

  if (!details.process || !details.businessQuestions || !details.keyInsights) {
    console.error("Proyecto incompleto:", project.id);
    onClose();
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto">
      {/* 1. Reducimos el padding lateral de px-4 a px-1 para acercar el modal al borde de la pantalla */}
      <div className="min-h-screen px-4 py-4 md:py-9">
        {/* 2. CAMBIO CLAVE: Subimos de 95vw a 98vw y de 1400px a 1600px (o la medida que prefieras) */}
        {/* Esto ensancha el cuadro blanco hacia afuera, reduciendo los márgenes negros laterales */}
        <div className="w-full max-w-[98vw] lg:max-w-[1600px] mx-auto bg-white rounded-2xl shadow-2xl">
          {/* Header (Mismo código) */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 md:px-8 md:py-6 flex justify-between items-center rounded-t-2xl z-10">
            <div>
              <div className="text-sm text-blue-600 font-semibold mb-1">
                {project.category}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {project.title}
              </h2>
              <h4 className="text-1xl md:text-1xl font-bold text-gray-600">
                Haz click en las imagenes para verlas con zoom
              </h4>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Content (Mismo código, manteniendo tus px-10 internos que te gustan) */}
          <div className="px-8 py-8 space-y-12">
            {/* Imagen principal - (Sin cambios en tu lógica interna) */}
            <div className="w-full flex justify-center">
              <img
                src={project.image}
                alt={project.title}
                onClick={() => setZoomImage(project.image)}
                className="w-full max-w-5xl h-auto rounded-xl shadow-md border border-gray-100 cursor-zoom-in"
              />
            </div>
            {/* Contexto */}
            {/* Contexto - CÓDIGO CORREGIDO */}
            {/* Contenedor con ancho limitado para mejor lectura */}
            <div className="max-w-5xl mx-auto">
              {/* Bloque de Contexto */}
              {(Array.isArray(details.context)
                ? details.context
                : [details.context]
              ).map((paragraph, i) => (
                <p
                  className="text-gray-600 italic mb-6 text-md leading-relaxed"
                  key={`ctx-${i}`}
                >
                  {paragraph}
                </p>
              ))}

              {/* Bloque de Impacto */}
              {(Array.isArray(details.impact)
                ? details.impact
                : [details.impact]
              ).map((paragraph, i) => (
                <p
                  className="text-md text-gray-800 leading-relaxed mb-6"
                  key={`imp-${i}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Preguntas de Negocio */}
            {details.businessQuestions && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 pl-14">
                  Preguntas de Negocio
                </h3>
                <div className="max-w-5xl mx-auto bg-blue-50 rounded-2xl p-8 shadow-inner">
                  <p className="text-gray-800 mb-6 font-medium italic">
                    Este sistema ayuda a la administración de los conceptos que
                    implican las siguientes preguntas:
                  </p>

                  {(() => {
                    let globalIndex = 0;

                    return details.businessQuestions.map((item, idx) => {
                      // CASO A: Es el formato complejo { category, questions: [] }
                      if (typeof item === "object" && item.questions) {
                        return (
                          <div key={idx} className="mb-8 last:mb-0">
                            <h4 className="text-blue-800 font-black uppercase tracking-wider text-sm mb-4 border-b border-blue-200 pb-1">
                              {item.category}
                            </h4>
                            <ul className="space-y-3">
                              {item.questions.map((question, qIdx) => {
                                globalIndex++;
                                return (
                                  <li
                                    key={qIdx}
                                    className="flex items-start gap-3 text-gray-700"
                                  >
                                    <span className="font-bold text-blue-600 min-w-[20px]">
                                      {globalIndex}.
                                    </span>
                                    <span>{question}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      }

                      // CASO B: Es el formato simple (un string directo o JSX)
                      globalIndex++;
                      return (
                        <div
                          key={idx}
                          className="mb-3 flex items-start gap-3 text-gray-700"
                        >
                          <span className="font-bold text-blue-600 min-w-[20px]">
                            {globalIndex}.
                          </span>
                          <span>{item}</span>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}

            {/* Proceso */}
            {details.process && (
              <div>
                <h3 className="pl-12 text-2xl font-bold text-gray-800 mb-6">
                  Proceso de Desarrollo (Haz clic en las imágenes para ampliar)
                </h3>
                <div className="space-y-8 ">
                  {details.process.map((step, idxpr) => (
                    <div
                      key={idxpr}
                      className="border-l-4 border-blue-500 pl-6"
                    >
                      <h4 className="text-xl font-semibold text-gray-800 mb-2 pl-14">
                        {idxpr + 1}. {step.title}
                      </h4>
                      {/* Contenedor para limitar el ancho y centrar el texto */}
                      <div className="max-w-7xl mx-auto">
                        {(Array.isArray(step.description)
                          ? step.description
                          : [step.description]
                        ).map((paragraph, i) => (
                          <p
                            className="text-gray-700 mb-4 leading-relaxed text-md"
                            key={i}
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      {step.image &&
                        (Array.isArray(step.image)
                          ? step.image
                          : [step.image]
                        ).map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`${step.title} ${i + 1}`}
                            onClick={
                              step.noZoom ? null : () => setZoomImage(img)
                            }
                            className={`w-full max-w-5xl mx-auto rounded-lg shadow-sm my-8 block ${step.noZoom ? "cursor-default" : "cursor-zoom-in"}`}
                          />
                        ))}
                      {step.src && (
                        <a
                          href={step.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg mt-4 pl-18"
                        >
                          👁️ Link a la Aplicación
                        </a>
                      )}

                      {step.codeExample && (
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{step.codeExample}</code>
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dashboard Breakdown */}
            {details.dashboardBreakdown && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 pl-12">
                  Características del Dashboard
                </h3>
                <div className="bg-gray-50 max-w-7xl mx-auto rounded-xl p-6">
                  <ul className="space-y-3">
                    {details.dashboardBreakdown.map((item, idxbk) => (
                      <li key={idxbk} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Key Insights */}
            {details.keyInsights && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 pl-12">
                  Insights Clave
                </h3>
                <div className="bg-green-50 max-w-7xl mx-auto rounded-xl p-6">
                  <ul className="space-y-3">
                    {details.keyInsights.map((insight, idxki) => (
                      <li key={idxki} className="flex items-start">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {/* Recomendaciones */}
            {details.recommendations && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Recomendaciones Estratégicas
                </h3>
                <div className="bg-orange-50 rounded-xl p-6">
                  <ul className="space-y-3">
                    {details.recommendations.map((rec, idxrec) => (
                      <li key={idxrec} className="flex items-start">
                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Imágenes adicionales */}
            {details.images && details.images.length > 1 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Galería (Haz clic en las imágenes para ampliar)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {details.images.map((img, idxim) => (
                    <img
                      key={idxim}
                      src={img}
                      alt={`Screenshot ${idxim + 1}`}
                      onClick={() => setZoomImage(img)}
                      className="w-full rounded-lg shadow-md"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Botón de regreso */}
            <div className="text-center pt-8 border-t border-gray-200">
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                ← Volver al Portafolio
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* CAPA DE ZOOM (Lightbox) */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out animate-in fade-in duration-300"
          onClick={() => setZoomImage(null)} // Cerrar al hacer clic
        >
          <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
            {/* Botón X para cerrar */}
            <button className="absolute top-0 right-0 m-4 text-white text-4xl hover:text-gray-300">
              &times;
            </button>

            <img
              src={zoomImage}
              alt="Zoom"
              className="w-auto h-auto max-w-[95vw] max-h-[90vh] rounded-lg shadow-2xl object-contain animate-in zoom-in-95 duration-300"
              style={{ transform: "scale(1.15)" }} // Aquí controlas el tamaño extra del zoom
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [copiedMail, setCopiedMail] = useState(false);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false); // Estado para WhatsApp
  const [copiedPhone, setCopiedPhone] = useState(false); // Estado para Teléfono Fijo

  const copyToClipboard = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["home", "about", "skills", "projects", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const skills = [
    {
      name: "Python",
      icon: "🐍",
      level: "Pandas, NumPy, Matplotlib, Scikit-learn",
    },
    {
      name: "React",
      icon: "⚛️",
      level: "Hooks, Context API, Reusable Components",
    },
    {
      name: "Looker Studio",
      icon: "📉",
      level: "Dashboards, Data Blending, Custom Reports",
    },
    { name: "Tableau", icon: "📈", level: "Dashboards, Storytelling" },
    {
      name: "Excel",
      icon: "📑",
      level: "Pivot Tables, Advanced Functions, Dashboards",
    },
    { name: "Power BI", icon: "📊", level: "DAX, Power Query, Data Modeling" },
  ];

  const projects = [
    {
      id: "etl-data-governance-framework",
      title:
        "Framework de Automatización de Datos: Pipeline ETL & Data Governance",
      category: "Analytics Engineering",
      description:
        "Infraestructura de procesamiento de datos diseñada para automatizar flujos administrativos y financieros complejos. Garantiza la integridad de los datos, la soberanía de la información, el cumplimiento normativo y de control interno digitales, mediante procesos locales, determinísticos y auditables.",
      image: "/images/etl-cover.png", // Aquí pondrías una miniatura del PDF generado
      tags: [
        "Python",
        "Pandas",
        "Analytics Engineering",
        "Data Governance",
        "Control Interno Digital",
        "Automatización de Procesos",
      ],
      metrics: [
        {
          title: "Procesamiento Híbrido",
          desc: "Real-time Watchdog & Batch Processing",
        },
        {
          title: "Arquitectura Privacy-First",
          desc: "Ejecución local sin exposición a nubes externas",
        },
        {
          title: "Integridad Decimal:",
          desc: "Cálculos financieros con precisión de punto fijo",
        },
        {
          title: "Trazabilidad Forense Completa:",
          desc: "Generación de Logs de Auditoría y Reportes de Excepción.",
        },
      ],

      detailedInfo: {
        context:
          "En el ecosistema financiero, los ERPs tradicionales a menudo presentan brechas de integridad al sincronizar reportes operativos con fuentes externas oficiales (como Banxico). Este proyecto desarrolla un pipeline ETL robusto que actúa como una capa de gobernanza automática, utilizando como ejemplo la auditoría de registros en moneda extranjera vs. el tipo de cambio oficial. Sin embargo, la arquitectura está diseñada para automatizar cualquier proceso administrativo, independientemente de la industria, mediante software local que garantiza la confidencialidad absoluta. A diferencia de las soluciones basadas en IAs externas, este enfoque elimina el riesgo de compartir información clasificada o 'know-how' con terceros, manteniendo el control total bajo los estándares de auditoría más estrictos.",

        impact:
          "El impacto inmediato es la eliminación de la conciliación manual y la mitigación directa de riesgos de cumplimiento y errores de 'timing' antes del cierre fiscal. No obstante, el valor estratégico reside en la soberanía de la información: el desarrollo de sistemas determinísticos y confiables liderados por un perfil que domina tanto el control interno como la ingeniería de datos. Esto permite que la organización no solo asegure la integridad de sus registros, sino que su equipo financiero evolucione de una carga operativa táctica hacia una gestión estratégica de alto nivel, operando en un entorno de automatización privado, seguro y auditable.",
        businessQuestions: [
          "Como ejemplo de caso de uso, este ejemplo automatiza la respuesta a interrogantes críticas de cumplimiento:",
          "¿Existen discrepancias entre el IVA registrado en el ERP y el cálculo basado en el Tipo de Cambio (TC) oficial de Banxico?",
          "¿Qué facturas fueron registradas con un TC desactualizado antes del cierre diario?",
          "¿Cuál es el impacto financiero acumulado por errores de redondeo o fluctuación no controlada en el mes?",
          "¿Cómo podemos garantizar un rastro de auditoría íntegro para cada reporte procesado?",
          "¿Podemos liberar al equipo de finanzas de la carga manual de conciliación periódica?",
        ],

        process: [
          {
            title: "Diseño de Arquitectura de Vigilancia (Watchdog)",
            description:
              "Implementación de un monitor de eventos del sistema de archivos que vigila directorios en tiempo real. El sistema detecta la llegada de nuevos reportes del ERP (TXT/CSV/Excel) e inicia el pipeline sin intervención humana. Otro enfoque de trabajo es configurar un proceso de 'batch' en el que cada cierto periodo de tiempo (ej. cada hora) se ejecuta el proceso de validación, lo que permite acumular los archivos que llegan durante ese periodo y procesarlos en bloque, optimizando recursos y permitiendo una conciliación más eficiente al final del día.",
          },
          {
            title: "Gestión de Estados y Trazabilidad (Pipeline Flow)",
            description:
              "Diseño de un flujo de estados robusto: Entrada → Procesando → Procesados | Errores. Cada etapa incluye manejo de excepciones para archivos bloqueados y un sistema de Logging detallado que sirve como evidencia de auditoría. Abajo, la imagen del log de procesamiento que se le puede pedir para dar trazabilidad al proceso (el contenido se diseña según los requerimientos).",
            image: "/images/etl-logs-example.png",
          },
          {
            title: "Cruce con Master Data Oficial (Data Merging)",
            description:
              "Desarrollo de un motor de búsqueda lógica con Pandas que realiza un 'lookup' dinámico (merge) entre los registros operativos y el archivo maestro de Tipos de Cambio oficiales, validando el TC exacto según la fecha de cada transacción.",
            codeExample: `# Lógica Core: Cruce de Auditoría con Pandas
              df_audit = pd.merge(df_facturas, df_master, on='Fecha', how='left')
              
              # Cálculo Forense de IVA
              df_audit['IVA_Correcto'] = (df_audit['Monto_USD'] * df_audit['TC_Oficial'] * 0.16).round(2)
              df_audit['Diferencia'] = (df_audit['IVA_Registrado'] - df_audit['IVA_Correcto']).round(2)
              
              # Filtrado selectivo de Excepciones
              df_excepciones = df_audit[df_audit['Diferencia'].abs() > 0.01].copy()`,
          },
          {
            title: "Ingeniería de Transformación y Normalización",
            description:
              "Normalización de tipos de datos y manejo de precisión decimal para evitar los errores de redondeo comunes en lenguajes de programación estándar. Asegura que el resultado coincida con los estándares de contabilidad gubernamental.",
          },
          {
            title: "Generación Automática de Reportes Ejecutivos (PDF)",
            description:
              "Integración de la librería FPDF para traducir los datos analíticos en un documento formal de auditoría. El reporte incluye resumen ejecutivo, totales de discrepancia y el detalle de cada factura que requiere atención inmediata.",
            image: "/images/etl-pdf-screenshot.png",
          },
          {
            title: "Generación Automática de Reportes Ejecutivos (.txt)",
            description:
              'Si el resultado se va a integrar a un papel de trabajo, por ejemplo en Excel, o a otro sistema, el resultado puede presentarse en un archivo ".txt".',
            image: "/images/etl-txt-screenshot.png",
          },
          {
            title: "Persistencia Estructurada y Consola de Gobernanza",
            description:
              "La arquitectura permite que los hallazgos de este motor ETL persistan en una base de datos PostgreSQL de alta disponibilidad. Esto transforma datos volátiles en una Fuente Única de Verdad (Single Source of Truth), fundamental cuando se requiere automatizar múltiples procesos críticos. El sistema permite reconstruir la trazabilidad histórica en cualquier momento, visualizando los detalles de cada excepción mediante una interfaz web privada con acceso basado en roles (RBAC), garantizando que la información sensible permanezca protegida dentro del perímetro de seguridad de la organización.",
            image: "/images/etl-sistema.png",
          },
          {
            title: "Arquitectura Desacoplada y Escalabilidad Funcional",
            description:
              "El sistema se diseñó bajo un modelo de micro-servicios donde el motor de procesamiento (Python) opera de forma independiente a la capa de visualización (Next.js). Esta modularidad permite inyectar nuevas reglas de negocio para cálculos de depreciaciones, amortizaciones, papeles de trabajo para auditoría o cierres mensuales, etc., simplemente agregando nuevos módulos al motor de transformación. La arquitectura es altamente escalable, permitiendo a la organización centralizar todos sus procesos de control interno digital en un solo framework de automatización financiera.",
          },
        ],

        dashboardBreakdown: [
          "Monitoreo de carpetas del sistema de archivos en tiempo real (Real-time Ingestion)",
          "Motor de transformación basado en Pandas para lógica de negocio contable compleja",
          "Sistema de validación cruzada con fuentes maestras de datos (Master Data Management)",
          "Logs de auditoría detallados (.log) para cumplimiento de control interno (SOX/ISO)",
          "Generador de informes de excepción en PDF con encabezados corporativos personalizados",
          "Estructura de directorios segregada para gestión segura de archivos (Archiving)",
        ],

        keyInsights: [
          "La automatización detecta discrepancias de 'timing' (errores de TC antes de las 12:00 PM) que son invisibles para la mayoría de los ERPs.",
          "Reducción del tiempo de conciliación de IVA de horas a segundos por archivo procesado.",
          "Detección proactiva de errores de captura antes de la presentación de declaraciones informativas (DIOT).",
          "Automatización y blindaje del 'Papel de Trabajo' para la determinación de IVA mensual, garantizando la consistencia total entre registros contables y el cálculo de impuestos.",
          "Sustitución de hojas de cálculo manuales por pipelines determinísticos en conciliaciones críticas (contenida en archivos Excel), eliminando la fragilidad operativa y garantizando la integridad de los datos procesados.",
          "El sistema actúa como una barrera de Control Interno, garantizando que solo los datos validados lleguen a los repositorios de información histórica.",
          "La trazabilidad forense total permite responder a requerimientos de la autoridad con evidencia documental generada al momento del proceso.",
        ],

        images: [
          //"/images/etl-flow-diagram.png", // Un diagrama de cómo se mueven los archivos
          //"/images/etl-pdf-screenshot.png", // El PDF reporte de excepciones
          //"/images/etl-logs-example.png", // Una captura de los logs de auditoría
        ],
      },

      link: "https://github.com/tu-usuario/tu-repo-etl", // Aquí pondrás el link a tu repo de GitHub
    },
    {
      id: "react-supertienda-admin",
      title: "Dashboard SuperTienda Analytics - Sistema Web Personalizable",
      category: "Full Stack Development / Data Analytics",
      description:
        "Aplicación web de analítica a medida desarrollada con Next.js y Python. Procesa 50k+ registros para diagnosticar fugas de capital y optimizar la rentabilidad operativa mediante una arquitectura de microservicios.",
      image: "/images/admintool_main.png",
      tags: [
        "Next.js",
        "PostgreSQL / Prisma",
        "Python FastAPI",
        "Pandas/Python",
        "Tailwind CSS",
        "Recharts",
      ],
      metrics: [
        {
          title: "Arquitectura Desacoplada (FastAPI + Next.js):",
          desc: "Separación clara entre la lógica de procesamiento de datos y la interfaz de usuario para máxima escalabilidad.",
        },
        {
          title: "Versatilidad Operativa:",
          desc: "Es un tablero personalizable de cualqueir cosa medible que quieras controlar en tu negocio, no sólo ventas, sino también producción, inventarios, logística, finanzas, recursos humanos, etc.",
        },
        {
          title: "Soberanía de Datos y Seguridad:",
          desc: "Control total del entorno de BI, eliminando costos de licenciamiento por usuario y garantizando la privacidad de la información.",
        },
        {
          title: "Ingesta de Datos Multifuente:",
          desc: "Procesamiento automatizado de archivos CSV/Excel e integración con motores XML para extracción directa de facturas CFDI 4.0.",
        },
        {
          title: "API RESTful de Alto Rendimiento:",
          desc: "Endpoints optimizados para la entrega de métricas financieras y operativas en milisegundos.",
        },
        {
          title: "Visualización Interactiva:",
          desc: "Gráficos dinámicos con tooltips inteligentes y lógica de colores para insights inmediatos.",
        },
        {
          title: "Despliegue en la Nube:",
          desc: " Frontend en Vercel y Backend en Render con Docker para una experiencia de usuario fluida y tiempos de carga mínimos.",
        },
      ],

      detailedInfo: {
        context:
          "A diferencia de las soluciones cerradas de BI (Tableau/PowerBI), este es un Ejemplo de Plataforma de Software a Medida que he desarrollado y que representa una solución a la Soberanía de Datos de Grado Empresarial. Diseñado bajo una arquitectura desacoplada (FastAPI + Next.js), el sistema elimina costos de licenciamiento por usuario y ofrece un control total sobre la seguridad y la interpretación estratégica de la información. Es escalable, y brinda total flexibilidad en la visualización de datos.",
        impact: [
          <>
            Mi enfoque no se limita a la visualización; diseño ecosistemas de
            datos que <strong>resuelven problemas operativos</strong> donde los
            sistemas tradicionales no llegan. Mi experiencia me permite integrar
            lógica de negocio compleja en soluciones automatizadas, tales como:
          </>,

          <>
            - <strong>Control de Manufactura y Logística:</strong> Monitoreo en
            tiempo real de KPIs de producción, trazabilidad de scrap/reprocesos
            y gestión de mantenimiento preventivo de activos fijos.
          </>,

          <>
            - <strong>Inteligencia de Capital Humano:</strong> Sistemas de
            gestión de horas-hombre y disponibilidad de planta mediante
            interfaces web dinámicas.
          </>,

          <>
            - <strong>Automatización Contable y Financiera:</strong>{" "}
            Estructuración de estados financieros automatizados desde el General
            Ledger, eliminando la dependencia de archivos Excel manuales y
            garantizando cierres mensuales más rápidos y auditables.
          </>,

          <>
            - <strong>Gobierno y Soberanía de Datos:</strong> Migración de
            procesos críticos administrados en hojas de cálculo hacia bases de
            datos profesionales con arquitecturas de seguridad (RBAC) de acuerdo
            a la política de confidencialidad, y trazabilidad total de
            transacciones.
          </>,

          <>
            Mi objetivo es transformar la carga administrativa en una ventaja
            competitiva, creando herramientas que permitan a la alta dirección y
            gerencia obtener <strong>hallazgos estratégicos </strong>sin
            necesidad de análisis adicionales.
          </>,

          <>
            Especializado en eliminar la complejidad crítica de los cierres
            mensuales; diseño sistemas que permiten parametrizar y clasificar
            balanzas de comprobación bajo criterios profesionales específicos,
            automatizando la revaluación de moneda extranjera no realizada,
            depreciación, amortización, consolidación, tablas de notas a los
            estados financieros; automatizando aspectos específicos repetitivos
            de la generación del{" "}
            <strong>paquete entregable de cierre de periodo </strong>u otros
            procesos contables complejos. Este enfoque{" "}
            <strong>
              sustituye la dependencia de archivos de Excel vulnerables{" "}
            </strong>
            por una base de datos profesional, garantizando que el procesamiento
            sea fiel a las políticas contables y eliminando la incertidumbre
            ante ajustes de última hora.
          </>,

          <>
            Cualquier <strong>proceso</strong> que actualmente administres en{" "}
            <strong>spreadsheets de Excel</strong>, puede ser llevado a un{" "}
            <strong>sistema personalizado</strong> como este, con esta calidad
            de gráficas, con la visión de lo que es importante{" "}
            <strong>controlar administrativamente</strong>, y te ayude a
            desarrollar las mejores estrategias con tu equipo. El poder de las
            gráficas es que muestran de manera más directa lo que una{" "}
            <strong>tabla con miles de registros</strong> no podría. Además con
            la ventaja de que puedes{" "}
            <strong>controlar la seguridad de tu información</strong>, y a la
            vez, diseñar la <strong>experiencia de usuario</strong> para que sea
            lo más amigable posible, y que el usuario pueda obtener{" "}
            <strong>hallazgos estratégicos</strong>, mediante{" "}
            <strong>alertas de colores</strong>, sin necesidad de hacer análisis
            adicionales.
          </>,

          <>
            Este sistema ejemplifica la arquitectura de datos que diseño: una
            interfaz segura donde la{" "}
            <strong>integridad de la información</strong> es la prioridad. El
            motor de ingesta está preparado para recibir archivos de datos (como
            .csv), validando automáticamente cada campo y actualizando tableros
            estratégicos de forma inmediata, eliminando el riesgo de error
            humano en el procesamiento.
          </>,
          <>
            En la última actualización del sistema se incluyó un robusto módulo
            de <strong>autenticación de grado empresarial</strong> aceptando,
            suspendiendo, eliminando usuarios para control de{" "}
            <strong>confidencialidad de información</strong> y una{" "}
            <strong>Sábana Auditora de Transacciones (Data Explorer)</strong>{" "}
            dotada de <strong>filtros dinámicos</strong> y capacidad de{" "}
            <strong>eliminación seleccionable</strong>, garantizando que el
            administrador tenga control total sobre la depuración de la base de
            datos. Cada movimiento queda registrado en una{" "}
            <strong>bitácora de auditoría inmutable</strong>, asegurando la
            trazabilidad de quién, cuándo y qué acción realizó.
            <br />
            <br />
            Asimismo, se integraron cuadros de{" "}
            <strong>Directrices Estratégicas (Executive Insights)</strong>{" "}
            editables en cada pestaña o dashboard, permitiendo que la alta
            dirección documente conclusiones y órdenes operativas directamente
            en cada panel de análisis.
          </>,
          <>
            Lo más novedoso es la incorporación de un{" "}
            <strong>motor universal de ingesta XML</strong>, que desarrollé,
            diseñado para extraer y procesar la información del{" "}
            <strong>CFDI 4.0 de ingresos</strong>. Este motor extrae
            automáticamente{" "}
            <strong>
              ventas, descuentos, cargos por envío, clientes, RFC y fechas
            </strong>{" "}
            directamente de la fuente legal (el XML), eliminando errores de
            captura y garantizando la <strong>soberanía del dato fiscal</strong>
            . El sistema se puede alimentar desde archivos de texto o tus
            propias facturas. Este feature de extracción avanzada es modular y
            puede ser{" "}
            <strong>
              trasladado a cualquier otro tipo de sistema personalizado
            </strong>{" "}
            donde se requiera automatizar el procesamiento de información
            tributaria y operativa.
          </>,
          <>
            A continuación, detallo las capacidades analíticas de este dashboard
            mediante el análisis del DataSet SuperTienda. Este proyecto
            ejemplifica el <strong>estándar de herramientas </strong>que puedo
            integrar en una organización para transformar datos crudos en
            activos estratégicos.
          </>,
        ],
        businessQuestions: [
          <>
            <b>En este Ejemplo</b>, a nivel de negocio, el sistema valida
            matemáticamente la pérdida de $920K USD por descuentos mal aplicados
            y desmiente mitos sobre los costos logísticos, para reorientar la
            estrategia comercial de la empresa. Las preguntas que se plantearon
            son:
          </>,
          "¿Es posible detectar automáticamente anomalías en márgenes de utilidad en tiempo real?",
          "¿Cómo impactan los descuentos agresivos (>20%) en la erosión del capital neto?",
          "¿Existe una correlación directa entre altos costos de envío y pérdidas operativas?",
          "¿Quiénes son realmente los clientes VIP que sostienen la rentabilidad del negocio?",
          "¿Qué subcategorías de productos (como Mesas) requieren una reestructuración inmediata de precios?",
          "¿En qué meses se concentran las caídas de ventas para diseñar estrategias de mitigación estacional?",
          "¿Qué plazas comerciales dentro de la República Mexicana son más rentables a pesar de los costos logísticos, y cuáles representan un riesgo constante?",
        ],

        process: [
          {
            title: "Ingeniería de Datos y Backend (Python/FastAPI)",
            description:
              "Desarrollo de una API RESTful con FastAPI. Procesamiento de datos crudos (CSV/Excel) utilizando Pandas para limpieza, tipado y agregaciones complejas (GroupBys, Pivot Tables). Implementación de endpoints específicos para cada módulo de análisis para optimizar la transferencia de datos (payloads ligeros).",
            codeSnippet: "Python, Pandas/Python, FastAPI, Docker",
            image: "/images/admintool-python.png",
            noZoom: true,
          },
          {
            title: "Arquitectura Frontend (Next.js & TypeScript)",
            description:
              "Construcción de una SPA (Single Page Application) moderna utilizando Next.js. Implementación de un sistema de componentes modular y tipado estricto con TypeScript para asegurar la estabilidad. Uso de Tailwind CSS para un diseño responsivo y consistente con la identidad corporativa.",
            image: "/images/admintool-dashboard.png",
            noZoom: true,
          },
          {
            title: "Visualización de Datos Avanzada",
            description:
              "Implementación de Recharts para gráficos interactivos. Desarrollo de lógica personalizada para Tooltips condicionales (lógica de colores dinámica según profit/loss, formateo inteligente de moneda/porcentajes). Creación de gráficos compuestos (Bar + Line) y Scatter Plots para análisis multidimensional.",
            image: "/images/admintool-descuentos.png",
            noZoom: true,
          },
          {
            title: "Despliegue y CI/CD",
            description:
              "Estrategia de despliegue desacoplada: Frontend en Vercel para optimización de entrega de contenido (CDN) y Backend en Render containerizado con Docker. Configuración de variables de entorno y manejo de CORS para comunicación segura entre cliente y servidor.",
            image: "/images/admintool-scatter.png",
          },
          {
            title:
              "Uso de Tooltips Contextuales Inteligentes (Cajas Negras Informativas)",
            description:
              "El uso deTooltips contextuales inteligentes es una característica clave que mejora significativamente la experiencia del usuario al interactuar con los gráficos. Estos tooltips permiten la identificación de los elementos integrantes de las gráficas, ofreciendo su información inmediatamente. También, se aplica una lógica de colores dinámica para resaltar visualmente los datos según su impacto en la rentabilidad (por ejemplo, verde para ganancias, rojo para pérdidas). Además, el formateo inteligente de moneda y porcentajes facilita la interpretación rápida de los datos financieros, permitiendo a los usuarios tomar decisiones informadas sin necesidad de análisis adicionales.",
            image: "/images/admintool-productos1.png",
          },
          {
            title: "Directrices Ejecutivas Narrativos",
            description:
              "Recuadros editables conectados a Base de Datos, para dejar comentarios, indicaciones, y/o conclusiones.",
            image: "/images/admintool-insights.png",
          },
          {
            title: "Link al proyecto en línea",
            description: [
              "Accede a la aplicación web completa para explorar el dashboard interactivo y analizar los datos de SuperTienda. Los perfiles administrador y usuarios tienen diferentes niveles de acceso para experimentar la herramienta desde distintas perspectivas: Los administradores pueden editar las directrices, controlar el acceso de los usuarios y acceder a toda la información, mientras que los usuarios tienen acceso de solo lectura para obtener la experiencia de usuario a quien se destina la información. Incluso podríamos controlar qué perfiles pueden ver algunos módulos, o no.",
              "Administrador:",
              "contador1.2@supertienda.com",
              "Password: Contador_1.2",
              "Usuario:",
              "contador1.1@ey.com",
              "Password: Contador_1.1",
            ],
            src: "https://bi-facturacion-mx.vercel.app",
          },
        ],

        dashboardBreakdown: [
          "Esto es sólo un ejemplo de las características que se pueden desarrollar en un dashboard personalizado, el límite es la imaginación y la habilidad para interpretar los datos de manera estratégica. En este caso, se desarrollaron los siguientes módulos:",
          "Panel de Control (Dashboard): KPIs en tiempo real (Ventas, Margen, Tendencias) y resumen ejecutivo.",
          'Módulo de Descuentos: Análisis de sensibilidad que revela la "Zona de la Muerte" (Descuentos >20%).',
          'Análisis de Productos: Scatter Plot interactivo de Ventas vs. Utilidad para identificar productos "Bleeders".',
          "Gestión de Clientes: Matriz de segmentación identificando Clientes Críticos (alto volumen, margen negativo).",
          "Logística Internacional: Mapa de calor y análisis de costos de envío vs. rentabilidad por país.",
          "Conclusiones (Directrices): Sección narrativa que traduce los datos en acciones de negocio concretas.",
          "Autenticación de Alto Grado: Implementación de seguridad mediante JWT (JSON Web Tokens) encriptados en Cookies HttpOnly, protegidos contra ataques XSS y CSRF, con hashing de contraseñas mediante el algoritmo Argon2.",
          "Módulo de Gobernanza y Control de Acceso: Sistema jerárquico (Owner, Admin, Usuarios) con Sala de Espera (Pending Queue) para aprobación manual de usuarios. Incluye funcionalidad para suspender temporalmente accesos a criterio del administrador.",
          "Bitácora de Auditoría Inmutable: Registro histórico automático de cada acción administrativa (aprobaciones, cambios de rol, eliminaciones) con trazabilidad exacta de fecha, hora (MX) y responsable, almacenado en Vercel Postgres.",
          "Motor de Ingesta con Validación Dinámica: Interfaz Drag & Drop para la carga de nuevos datasets (CSV) y/o la Ingesta de datos desde el CFDI 4.0 de ingresos, para actualizar constantemente el dataset que alimenta las gráficas. El backend valida programáticamente la integridad de las columnas y realiza un Hot-Reload de los datos sin interrumpir el servicio.",
          "Módulo de Directrices Ejecutivas: Sistema de gestión de contenido (CMS) integrado que permite a los directivos insertar directrices estratégicas personalizadas para cada módulo de análisis, guardadas permanentemente en la base de datos.",
        ],

        keyInsights: [
          "Diagnóstico de Fuga: Se confirmaron pérdidas por $920K USD concentradas exclusivamente en transacciones con descuentos superiores al 20%.",
          "Mito del Flete: Los datos desmienten que el transporte afecte el margen; países con envíos caros (+$120) siguen siendo rentables.",
          'Problema de Categoría: "Furniture" (específicamente Mesas) opera con margen negativo estructural, no coyuntural.',
          "Concentración VIP: Existe una intersección sana de clientes de alto volumen y alta rentabilidad que sostienen el crecimiento.",
          "Estacionalidad: Las caídas más pronunciadas de ventas ocurren consistentemente en Julio y Octubre.",
        ],

        images: [
          "/images/admintool-estacion.png", // Tu vista principal (Dashboard)
          "/images/admintool-descuentos2.png", // La gráfica de barras roja/gris (Fuga)
          "/images/admintool-productos.png", // Scatter plot o lista de productos
          "/images/admintool-clientes.png", // Gráfica de barras horizontal (Países/Clientes)
          "/images/admintool-paises.png", //
          "/images/admintool-conclusiones.png", // La página de texto con los checks
          "/images/admintool-gestiondatos.png", // La sección de gestion de archivos csv
          "/images/admintool-ingestacfdi.png", // La sección de ingesta de datos desde CFDI
          "images/admintool-tabladatos.png", // La sección de tabla de datos (Data Explorer)
          "/images/admintool-bitacora.png", // La sección de bitácora
          "/images/admintool-directrices.png",
          "/images/admintool-controlusuarios.png", // La sección de control de usuarios
        ],
      },
    },

    {
      id: "RepoDeclara",
      title:
        "RepoDeclara, Repositorio de Declaraciones Fiscales y Documentos Legales",
      category: "Soluciones en Sistemas Fiscales/Administrativos",
      description:
        "Sistema completo de documentación de declaraciones fiscales y documentos legales para su análisis, control y seguimiento. Te ofrece:",
      image: "/images/RepoDeclara-Tablero Principal.png",
      tags: ["React 19", "Next.js 16 (App Router)", "Prisma ORM", "TypeScript"],
      metrics: [
        {
          title: "Documentación y Digitalización de Declaraciones:",
          desc: "Mediante la  Cédula Integral de Registro (CIR) se documenta cada presentación al SAT",
        },
        {
          title: "Listado de Declaraciones:",
          desc: "Con Actualizaciones y Recargos, Saldos a Favor",
        },
        {
          title: "Compensaciones:",
          desc: "Dcumenta sus Aplicaciones y Actualizaciones",
        },
        {
          title: "Devoluciones:",
          desc: "Documena sus Actualizaciones e Intereses Moratorios",
        },
        {
          title: "Integración de papeles de trabajo por declaración:",
          desc: "No vuelvas a perder la versión final de tus papeles de trabajo para cada declaración presentada. Adjunta y relaciona el archivo definitivo a cada declaración.",
        },
        {
          title: "Demandas:",
          desc: "Documentación y planeación de procesos legales (Historial de demandas, seguimiento a vencimientos, evidencias, resultados, etc.)",
        },

        {
          title: "Contratos:",
          desc: "Seguimiento a su Cumplimiento para evitar riesgos de sanciones por no planear y asignar responsabilidades al equipo",
        },

        {
          title: "Seguimiento al Cumplimiento de Proyectos:",
          desc: "Planeación y Asignación de actividades",
        },
        { title: "Pólizas:", desc: "Seguimiento y Vencimiento" },
        {
          title: "Archivo Permanente:",
          desc: "Acta Constitutiva, Poderes, Licencias, Contratos, Seguros, Proyectos, etc.",
        },
      ],

      detailedInfo: {
        context: [
          "En México, millones de pesos en saldos a favor se pierden o se vuelven inauditables porque los papeles de trabajo de determinaciones fiscales se llevan en archivos de Excel y se guardan en carpetas de Windows desordenadas, lo cual es un control muy precario ya que se pueden perder las versiones definitivas, y con ello se pone al contribuyente en riesgos legales y/o expuestos a créditos fiscales por no poder diseñar una defensa fiscal sólida debido a los tiempos de respuesta exigibles por el SAT.",
          "RepoDeclara elimina la dependencia de 'hojas de cálculo personales' y de consultores externos, devolviendo a la empresa el control total y forense del dinero propio que retiene el SAT.",
          "En una revisión de cualquier autoridad, le otorgan al contribuyente un plazo para atender, por lo que el tiempo se vuelve el mayor enemigo al plantear una defensa estratégica. Mantén tu información al día para que tu estrategia sea poder entender si hay un riesgo y cómo mitigarlo, y no tener que emplear largas jornadas para agrupar información y entender tu propia situación fiscal.",
          "Cuando es necesario agrupar la información fiscal para presentar a algún revisor (Auditor, Autoridades, Ejecutivos, Dueños, Due Dilligence, etc.), se pierden tiempo y otros recursos para agrupar y relacionar documentos manualmente, enlistar la información de declaraciones, compensaciones, devoluciones, relacionar papeles de trabajo y evidencia de negocio de las operaciones que sirvieron de base a esos cálculos. Dependiendo del revisor, no terminar a tiempo toda la información para presentar, resulta en multas, créditos fiscales, una revisión más profunda por parte de las autoridades u otro tipo de consecuencias.",
        ],

        impact: [
          <>
            ¿Qué es <strong>RepoDeclara</strong>?
          </>,

          <>
            <strong>
              Es Gobernanza Contable, un Repositorio Forense con Integridad de
              Datos frente al SAT, Gestión de Riesgos y Certeza Financiera"
            </strong>{" "}
            Es la solución para conocer el <strong>estatus real</strong> y
            obtener evidencia de la existencia de la información fiscal y legal,
            depositada en una base de datos en donde se documenta la
            <strong> historia fiscal y legal</strong> de empresas y
            contribuyentes en general.
          </>,
          <div
            key="pillars"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8"
          >
            <div className="bg-white p-6 rounded-xl border-l-4 border-blue-500 shadow-sm">
              <h4 className="font-bold text-blue-900 mb-2">
                Visibilidad del Flujo:
              </h4>
              <p className="text-sm text-gray-600">
                Deja de ver la recuperación como un "proceso en sombras". Conoce
                tus saldos en segundos, qué saldos tienes, cuánto se ha
                recuperado y qué falta por solicitar..
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border-l-4 border-indigo-500 shadow-sm">
              <h4 className="font-bold text-indigo-900 mb-2">
                Integridad Forense:
              </h4>
              <p className="text-sm text-gray-600">
                Cada peso compensado o devuelto tiene un rastro inalterable. Si
                el SAT audita hoy una declaración de hace 3 años, RepoDeclara te
                da sustento legal y el cálculo exacto en un clic.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border-l-4 border-purple-500 shadow-sm">
              <h4 className="font-bold text-purple-900 mb-2">Blindaje Legal</h4>
              <p className="text-sm text-gray-600">
                No solo guardas declaraciones, documentas la materialidad de tus
                contratos y el cumplimiento de tareas de tu equipo. Si un
                responsable se va de la empresa, su conocimiento se queda en
                RepoDeclara, no en su computadora.
              </p>
            </div>
          </div>,
          <>
            Es un sistema de <strong>documentación fiscal y legal</strong> que
            permite tener toda la información organizada, actualizada y
            disponible para cualquier revisión; ideal para demostrar el{" "}
            <strong>cumplimiento de obligaciones fiscales</strong>, así como
            documentar, mostrar y dar seguimiento a los procesos de
            <strong> recuperación de dinero</strong> por Pagos Indebidos de
            Impuestos, Saldos a Favor de IVA Operativos o Procesos Legales.
          </>,

          <>
            Especialmente cuando la autoridad fiscal emite Requerimientos de
            Información o Devoluciones Parciales, o existen{" "}
            <strong>
              Remanentes de Saldos Pendientes de recuperar antigüos
            </strong>{" "}
            (dinero en poder del SAT), tener toda la información organizada es{" "}
            <strong>FUNDAMENTAL para sustentar el éxito</strong> de
            Compensaciones y Devoluciones, así como para{" "}
            <strong>EVITAR multas</strong> y créditos fiscales, o{" "}
            <strong className="font-semibold text-blue-800">DEFENDERSE</strong>{" "}
            ante las Facultades de Revisión de SAT o una acusación por Delito
            Fiscal.
          </>,

          <>
            También es la herramienta que permite la{" "}
            <strong>Optimización del Flujo de Efectivo</strong> haciendo de la
            recuperación estratégica de Saldos a Favor un proceso{" "}
            <strong>visible y con evidencias</strong>, y{" "}
            <strong>no un proceso en sombras</strong> que solamente conocen las
            personas que presentan los trámites. Si el sistema es alimentado
            consistentemente, presenta a los{" "}
            <strong>shareholders la certeza</strong> de qué se está haciendo y
            hace visibles los contratiempos, para que no se convierta en un
            factor más de{" "}
            <strong>
              incertidumbre en la planeación del flujo de efectivo
            </strong>
            .
          </>,
        ],

        businessQuestions: [
          {
            category: "Estatus de Recuperación (Saldos a Favor)",
            questions: [
              "¿Cuáles declaraciones se han presentado?",
              "¿Cuándo se presentaron?",
              "¿Con qué montos?",
              "¿Cuales son los saldos a favor y cuál es su saldo actual?",
              "¿Cuáles montos se recuperaron o están por recuperar vía devolución?",
              "¿Cuales montos fueron rechazados por el SAT?",
              "¿Hubo requerimientos de información?",
              "¿Cuánto tiempo se bloqueó el plazo de 40 días por requerimientos?",
              "¿Cuál es el plan de trabajo para contestar al SAT?",
              "¿El SAT se negó a devolver?, ¿Por qué?",
            ],
          },
          {
            category: "Blindaje Forense y Auditoría",
            questions: [
              "¿Se compensaron impuestos a cargo contra montos a favor?",
              "¿Se calcularon actualizaciones a favor?",
              "¿Hubo modificación de saldos tras compensaciones parciales?",
              "¿Hay impuestos a cargo por errores en compensación?",
              "¿Está documentado el resultado de revisiones fiscales?",
            ],
          },
          {
            category: "Materialidad y Cumplimiento Legal",
            questions: [
              "¿Cómo se documenta la materialidad de transacciones importantes?",
              "¿Los contratos están vigentes y tienen riesgos?",
              "¿Es seguro compartir contratos por email o prefieres un sistema sellado?",
              "¿Cómo se documentan las Pólizas de Seguros?",
              "¿Dónde está la ubicación de los papeles físicos?",
              "¿Dónde se documentan los faltantes de información?",
              "¿Cómo se da seguimiento a juntas y acuerdos de equipo?",
              "¿Te parece relevante esta herramienta?",
            ],
          },
        ],

        process: [
          {
            title: "Cédulas Integral de Registro (CIR)", // Título del módulo
            description: [
              "Una Cédula Integral de Registro (CIR) es el módulo central para la captura de la información detallada de una declaración vinculada a un Número de Operación Único. Permite documentar en un solo evento uno o más impuestos presentados (Federales, Estatales, Retenciones).",
              "Garantiza que el fruto del trabajo administrativo sea un registro permanente y auditable",
              "Esta interfaz gestiona datos críticos como Periodo, Fecha de Presentación, Montos a cargo, Montos presentados con anterioridad (para complementarias), INPCs, Factores de Actualización, Recargos y Memos de aclaración.",
              "Botón (Subir Acuse SAT) para subir los archivos relacionados como: la declaración en digital, Archivos relevantes para el cálculo. Los papeles de trabajo se pueden adjuntar con otro botón que es específico para cada impuesto (Soporte Documental Específico), de esta manera cuando se consulte un impuesto se obtiene toda la información capturada y los archivos globales y específicos relacionados a ese impuesto.",
              "El sistema detecta automáticamente si el monto de una declaración complementaria genera un Saldo a Favor, creando una 'Bolsa de Recuperación' disponible para procesos de compensación o devolución.",
            ],
            image: "/images/RepoDeclara-sabana.png",
          },
          {
            title: "Modal de Compensaciones (Precisión Aritmética)",
            description: [
              "Si presionas el botón 'Gestionar Aplicaciones (Multi-Bolsa)' se abre el Distribuidor Modal de Compensaciones en el cual puedes elegir la bolsa (monto a favor) de la cual se compensó al presentar la declaración. A veces pueden ser necesarios más de un saldo a favor y se tiene que elegir el monto a aplicar. A pesar de ser un sistema forense, hace cálculos que permiten fácilmente capturar la información.",
              "Este Distribuidor calcula la actualización del monto (parcial o total) que se está tomando del saldo a favor, desde el momento en que nació el saldo a favor al momento de cada aplicación.",
            ],
            image: "/images/RepoDeclara-modal-multicompensacion.png",
          },
          {
            title: "Listado de Declaraciones",
            description: [
              "Cada vez que se guarda una CIR, cada impuesto se forma en su tarjeta exclusiva específica de su nombre, en donde se puede revisar la información capturada (Favor de ampliar el zoom del navegador a +175)",
              'En la columna "Compensación" se muestra el monto total compensado (Acumulación de una o más aplicaciones de diferentes bolsas) el cual se disminuye del monto pagado (columna: "Pagado / (-) Pend. Rec."), el cual puede ser "cero", o haber quedado un remanente pagado con dinero.',
              'Se puede obtener en un reporte Excel la información del tablero principal. Cabe aclarar que todos los módulos tiene una o varias versiones de Reportes Excel, hay un Reporte General en Excel con toda la información capturada en un click. También, con el botón "Bóveda de Evidencia" se pueden obtener todos los archivos (o una selección) que hayan servido de evidencia para las declaraciones (Archivos: .xlsx, .docx, pdf, imágenes, fotografías, etc.)',
            ],
            image: [
              "/images/RepoDeclara-declaraciones-1.png",
              "/images/RepoDeclara-declaraciones-2.png",
            ],
          },
          {
            title: "Modal de Resumen de declaración",
            description:
              "El modal de resumen (ventana desde la derecha que surge al dar click en botón de acciones) permite identificar instantáneamente todos los elementos que han afectado a la declaración: compensaciones, actualizaciones y recargos del monto a cargo, actualizaciones del monto a favor, monto histórico aplicado en la compensación, INPC's y Factor de actualización así como meses de recargos, Memo de aclaraciones y archivos digitales como evidencia de la información de la declaración.",
            image: "/images/RepoDeclara-resumen-modal.png",
          },
          {
            title: "Tarjetas de Reamanentes de Compensación",
            description: [
              "En estas tarjetas muestran claramente cuáles han sido las aplicaciones de cada monto a favor, con toda su información, y el saldo remanente por aplicar en el futuro (Ese saldo también se puede ver desde el Listado de Declaraciones).",
              "Se puede observar claramente el Monto a Favor Inicial, el Monto Compensado, su Monto Histórico (el que en realidad disminuye la Bolsa o Monto a Favor), los INPC's y Factor con que se calculó la Actualización a Favor en el Distribuidor Modal, y lo más importante en este caso, el remanente por compensar hasta ese momento.",
              "Uno de los peores escenarios es haber determinado un saldo a favor, haber hecho aplicaciones a ese saldo por compensación, y tiempo después por auditoría o revisión se determina que el saldo original no era correcto. El sistema no pierde el control gracias a su trazabilidad de declaraciones y montos acumulados de compensaciones.",
              "La primer tarjeta representa ese escenario, en la normal de marzo se pagaron $825,686 MXN después se identificó lo que pudo haber sido un error de captura y se presentó la complementaria por $225,686 MXN, e iniciaron las compensaciones contra un monto a favor de $600,000. Tiempo después se determinó que el monto correcto era $375,686 MXN, pero la bolsa en el sistema ya se había creado por $600,000 MXN a favor. Con la captura de la segunda complementaria el monto de la bolsa desciende a $450,000 MXN y con ello, se modifica la tarjeta automáticamente cambiando su monto inicial y mostrando el remanente por compensar correctamente (incluso si fuera negativo por haber compensado de más).",
              "Recordar que al monto compensado, en el saldo a favor, se debe restar la actualización a favor de esa parcialidad, disminuyendo sólo el monto histórico del Saldo a Favor, e identificando para contabilizar la actualización a favor. Gracias a la identificación y posterior seguimiento se puede evitar un procedimiento de revisión por parte del SAT.",
              "Se puede obtener en Excel cada tarjeta tal como se ven en la pantalla, u obtener el reporte global Excel en donde se obtiene la información del Saldo a Favor (SF), el Monto a cargo de cada impuesto aplicado a ese SF y sus accesorios, así como la Actualización a Favor de cada aplicación, mostrando al final el Saldo Remanente de cada monto a favor.",
            ],
            image: [
              "/images/RepoDeclara-header-remcompensacion.png",
              "/images/RepoDeclara-card-remcompensacion.png",
            ],
          },
          {
            title: "Tarjetas de Remanentes de Devolución",
            description: [
              "En estas tarjetas muestran claramente la información de las Solicitudes de Devolución de cada Monto a Favor que se decidió recuperar por esta vía, con toda su información (y archivos), y el saldo remanente por solicitar en el futuro (Ese saldo también se puede ver desde el Listado de Declaraciones).",
              "El sistema también contempla el caso en el que una empresa, por estrategia o porque tiene toda la evidencia de un porcentaje y del otro porcentaje tiene pendientes para obtener la evidencia, decida solicitar sólamente el porcentaje que tiene completo, dejando para una solicitud posterior el resto. El SAT es extremadamente minucioso.",
              'En nuestro primer ejemplo, el monto a favor inicial es $3,150,000, la primer solicitud es por $2,500,000 MXN pero el SAT sólo devuelve $2,350,000 MXN; En la segunda solicitud se piden $550,000 MXN, pero el SAT sólo devolvió $450,000 MXN; En la tercer solicitud se piden $350,000 MXN y se componen de $150,000 que fueron rechazados en la primera solicitud, más $100,000 que fueron rechazados en la segunda solicitud (son $250,000 MXN que estan con estatus de "Rechazo Parcial"), más $100,000 MXN que faltaban por solicitar, da $350,000 MXN. En esta solicitud hay un requerimiento de información, el cual no se ha contestado, por eso la diferencia en fechas (el sistema proyecta el bloqueo y los 40 días) y el color amarillo en la última fila de la primer tarjeta. En la segunda tarjeta faltan por solicitar $243,329 MXN.',
              "Se puede observar claramente el Monto a Favor Inicial, el Monto Solicitado en Devolución, su Monto Histórico (el que en realidad disminuye la Bolsa o Monto a Favor), los INPC's y Factor con que se calculó la Actualización a Favor concedida por el SAT en la Resolución de Devolución, el monto recuperado de esa solicitud, y el monto pendiente por el rechazo parcial en esa solicitud.",
              "Algo muy común al irse consumiendo el plazo que tiene la autoridad para contestar la Solicitud de Devolución es emitir un Requerimiento de Información, el cual detiene el conteo de días de ese plazo, teniendo que volver a pronosticar la nueva fecha en que se obtendrá la Resolución.",
              "También se pueden documentar los intereses (cuando la autoridad hace la devolución fuera de plazo). Cada tarjeta muestra el Monto Inicial de la Bolsa, Los montos parciales rechazados de cada solicitud (si hubo), los montos que no se han solicitado, indicando al final el Remanente por Recuperar de cada Monto a Favor, teniendo incluso la opción de convertir un remanente en un Monto por Compensar.",
              "Se puede obtener en Excel cada tarjeta tal como se ven en la pantalla, u obtener el Reporte Global Excel de Devoluciones en donde se obtiene toda la información referente a la Solicitud de Devolución, Requerimiento de Información, Resolución Negativa o Afirmativa, Fechas, Actualizaciones, Intereses, plazos, etc.) mostrando al final el Saldo Remanente de cada monto a favor que se pretende recuperar por esta vía.",
              "Esto lo hace la herramienta ideal para identificar saldos pendientes de recuperar, actualizaciones e intereses para contabilizar, y tener una representación gráfica del estatus de cada monto a favor, para sobrevivir a cualquier cuestionamiento al respecto.",
            ],
            image: [
              "/images/RepoDeclara-header-remdevolucion.png",
              "/images/RepoDeclara-card-remdevolucion.png",
              "/images/RepoDeclara-card-remdevolucion2.png",
            ],
          },
          {
            title: "Sección: Documental para Cumplimiento Legal",
            description: [
              "Esta sección esta diseñada para documentar cualquier proceso fiscal o legal de la empresa, ya sea que el mismo requiera una reacción y por lo tanto una planeación de las acciones que el equipo responsable debe llevar a cabo para evitar un riesgo o administrarlo.",
              "En esta cédula de captura se muestran los campos que pueden ser llenados para dejar documentado un documento o un proceso, y servir como referencia para la salvaguarda física, por ejemplo en gavetas, por parte de la empresa.",
              "Se trata de tener un espacio y guardar en base de datos la historia legal de la empresa, cuáles fueron los retos que se tuvieron/tienen que enfrentar, quién estuvo a cargo, quién participó en las sesiones, quién fue asignado por medio de tareas específicas, un qué fecha se le requirió que cumpliera, y la fecha en que cumplió o no.",
              "En ese sentido, se trata de documentar un proceso (no una foto fija) y dejar evidencia de la manera en que el equipo responsable hizo frente a un riesgo para el patrimonio de la empresa.",
              "Este sistema garantiza que sólamente los usuarios acreditados para usar esta sección pueden tener acceso a la información y documentos que requieren el mayor grado de confidencialidad y que sólamente los pueda ver quién los tenga que ver. Mientras que hay ususarios que sólo pueden ver la parte operativa fiscal y hay perfiles de usuario que tienen acceso a todo el sistema, incluyendo la bitácora del sistema",
            ],
            image: [
              "/images/RepoDeclara-legal1.png",
              "/images/RepoDeclara-legal2.png",
            ],
          },
          {
            title: "Sección: Documental para Cumplimiento Legal,  Tarjetas",
            description: [
              "Aquí se muestran dos ejemplos de la manera en que pueden quedar documentados los procesos a los que se decida dar seguimiento mediante el sistema. Se puede observar que hay algunas actividades que no aparecen cerradas, lo que puede llevar a tomar decisiones como mayor involucramiento activo de otras personas del equipo en esa actividad, es decir, revisar el estatus del proceso puede ser la diferencia entre cumplir las fechas compromiso (deadlines) o no.",
            ],
            image: [
              "/images/RepoDeclara-cardlegal.png",
              "/images/RepoDeclara-tarjetalegal2.png",
            ],
          },
          {
            title: "Bóveda de Evidencia Fiscal Blindada",
            description: [
              'Además de poder subir, bajar o eliminar todos los archivos desde la sección en que fueron adjuntados también tenemos la Bóveda de Evidencia Fiscal Blindada, con los archivos digitales, que permite descargar todos o algunos archivos seleccionándolos, en cualquier momento. Todo por medio del botón del tablero principal "Bóveda de evidencia".',
            ],
            image: [
              "/images/RepoDeclara-boveda.png",
              "/images/RepoDeclara-boveda-seleccion.png",
            ],
          },
          {
            title: "Link al proyecto en línea",
            description: [
              <strong>DEMOSTRACIÓN TÉCNICA Y CONSULTORÍA</strong>,
              "RepoDeclara es una prueba de concepto avanzada de arquitectura forense de datos. Si su organización enfrenta desafíos similares en la trazabilidad de saldos a favor o en la gobernanza de documentos fiscales, estoy disponible para realizar una demostración técnica del sistema o para colaborar en el diseño de soluciones personalizadas que aseguren la integridad de su información.",
              "Si quieres conocer el sistema, puedes acceder a la aplicación web completa para explorar el dashboard principal y analizar los datos de RepoDeclara.",
              "Si quieres acceder a la empresa que tiene ejemplos completos puedes entrar con el usuario: administradorfy@fy.com; password: Administradorfy",
              "Si quieres accesar a las empresas de pruebas y generar tus propias capturas puedes hacerlo con: administrador1.3@fy.com; password:FyAdministrador1.3",
              "La empresa Empresa Young, S.A de C.V. tiene ejemplos concretos. La empresa Pruebas, S.A. de C.V. contiene algunas declaraciones pero sin compensaciones o devoluciones. Puedes entrar a generar nuevas declaraciones (CIR) o puedes entrar a editar cualquier declaración e intentar hacer una compensación en el módulo de compensaciones (dentro de la misma CIR).",
              "La empresa SINDATOS PRUEBA2, S.A. de C.V. esta completamente vacía para que generes tus propias CIR y escenarios",
              'También, puedes generar una captura de Solicitud, Requerimiento de información y Resolución, con datos sintéticos de tu preferencia. No nos hacemos responsables por la información que adjuntes o captures, considera que otras personas podrán ver esta versión de prueba. Cuando lancemos RepoDeclara en la versión en producción la información estará sellada sólo para los usuarios autorizados por el "administrador de la empresa" que se asigne en el sistema a cada empresa.',
              "Debido a que estamos usando una base de datos de prueba, el límite de archivos pesados es limitado. Te agradecería si al final de tu prueba borras los archivos que adjuntes, después de generar los reportes en Excel o pantallas que gustes.",
              <strong>Nota: </strong>,
              "RepoDeclara está diseñado como un repositorio de espejo (mirroring) de la información ya presentada ante la autoridad. Los cálculos internos de accesorios se presentan únicamente como una herramienta de validación forense para identificar posibles discrepancias en los registros originales.",
            ],
            src: "https://repo-declara.vercel.app/",
          },
        ],

        dashboardBreakdown: [
          "El tablero principal esta ordenado por tarjetas de impuestos, ordenadas de más recientes a mas antiguas lo que permite ver claramente el saldo de impuesto a cargo o a favor de cada mes, si importar cuántas declaraciones tenga ese mes y cuántas compensaciones y/ devoluciones tenga ese impuesto/periodo.",
          "La sección Documental para Cumplimiento Legal permite llevar un control de los compromisos más importantes de la entidad, o incluso puede ser usada como bitácora de reuniones gerenciales en donde se den seguimiento a los objetivos de la empresa como un proceso continuo, separadas por ejemplo, por cada mes.",
          "El sistema tiene una sección en donde se guardan los INPC's que se acumulan gracias al llamado de una API del Banco de México, por lo que con un click mensual se mantendrá actualizado el listado.",
          "El sistema cuenta con un proceso de autenticación para poder entrar al sistema, garantizando que sólo los usuarios asignados a cada empresa tengan acceso. Ningún usuario puede ver una empresa a la que no haya sido asignado previamente",
          "La bitácora es un subsistema que da seguimiento al momento y a la persona que elimine elementos posteados en la base de datos.",
        ],

        keyInsights: [
          "Recomiendo ver el caso de marzo en cuanto al tema de compensaciones",
          "Las tarjetas de remanentes de devoluciones contienen toda la información accediendo a Solicitudes, Requerimiento de Información, Resoluciones por medio de los botones correspondientes en las tarjetas",
          "RepoDeclara no es una calculadora fiscal, es un Repositorio que respeta los datos con los que fueron presentadas las declaraciones, mientras te presenta cálculos de los accesorios para hacer una comparación contra los cálculos reales, es decir, son una ayuda que pretende dar indicios de errores o montos inadecuados permitiendo la captura fiel de la información presentada.",
        ],

        images: [
          "/images/RepoDeclara-panel-inicio.png", // página de inicio al sistema
          "/images/RepoDeclara-panel-control.png", // Administración de usuarios y empresas
          "/images/RepoDeclara-admon-empresas.png", // Panel de elementos asignados a cada empresa
          "/images/RepoDeclara-usuarios.png", // Usuarios
          "/images/RepoDeclara-inpc.png", // Catálogo INPC
          "/images/RepoDeclara-recuperacion.png",
          "/images/RepoDeclara-bitacora1.png",
          "/images/RepoDeclara-bitacora2.png",
        ],
      },
    },
    {
      id: "ml-employee-turnover",
      title: [
        "Predicción de Rotación de Empleados\n",
        "(Proyecto Capstone para graduación de Google Advanced Data Analytics Certificate)",
      ],
      category: "Machine Learning",
      description:
        "Modelo predictivo XGBoost que identifica empleados en riesgo de abandono con 98.3% de precisión, permitiendo intervenciones proactivas de retención en Salifort Motors.",
      image: "/images/ml-sharp-cover.png",
      tags: ["Python", "XGBoost", "SHAP", "Scikit-learn", "Employee Analytics"],
      metrics: [
        { title: "AUC", desc: " 98.3%" },
        { title: "F1-Score", desc: " 94.8%" },
        { title: "Registros Analizados", desc: " 11,991" },
      ],

      detailedInfo: {
        context:
          "Proyecto capstone del Google Advanced Data Analytics Certificate. Análisis completo de 14,999 registros de empleados de Salifort Motors para predecir rotación laboral y entregar recomendaciones accionables al departamento de Recursos Humanos. Implementación del framework PACE (Plan, Analyze, Construct, Execute) para desarrollo sistemático.",

        impact:
          "Desarrollo de modelo XGBoost con 98.3% AUC que identifica con precisión del 94.8% (F1-Score) a empleados en riesgo de abandono. El modelo detecta correctamente al 15.76% de empleados como alto riesgo, coincidiendo con la tasa real de rotación del 16.85%. Esto permite intervenciones proactivas que podrían ahorrar millones en costos de reclutamiento y capacitación.",

        businessQuestions: [
          "Este sistema ayuda a la administración de los conceptos que implican las siguientes preguntas:",
          "¿Qué factores hacen que un empleado deje la compañía?",
          "¿Es posible predecir qué empleados están en riesgo de irse?",
          "¿Qué empleados específicos requieren intervención inmediata?",
          "¿Cuál es el momento óptimo para iniciar estrategias de retención?",
          "¿Cómo se puede escalar esta solución para monitoreo continuo?",
        ],

        process: [
          {
            title: "Plan - Definición del Problema",
            description:
              "Stakeholders identificados: HR y Liderazgo Ejecutivo. Objetivo: Predecir riesgo de rotación para habilitar retención proactiva. Consideraciones éticas: privacidad de datos, mitigación de sesgos, transparencia en decisiones. Dataset inicial: 14,999 registros con 10 características incluyendo satisfaction_level, last_evaluation, number_project, average_monthly_hours, time_spend_company, work_accident, promotion_last_5years, department, y salary.",
            image: "/images/ml-features.png",
          },
          {
            title: "Analyze - Análisis Exploratorio (EDA)",
            description:
              "Limpieza profunda del dataset: eliminación de 3,008 registros duplicados (20% del total), resultando en 11,991 registros únicos. Detección de 824 outliers en tenure usando IQR y boxplots. Encoding de variables categóricas (salary, department) a variables dummy. Descubrimiento de desbalance de clases: solo 16.85% de rotación.",
            image: "/images/ml-sl-distribution.png",
          },
          {
            title: "Hallazgos Clave del EDA",
            description:
              'Correlación inversa significativa entre satisfaction_level y abandono (-0.35). Empleados con baja satisfacción (<0.3) muestran alta rotación. Sin promoción en 5 años: 17% de abandono vs 4% con promoción. Sobrecarga laboral crítica: >270 horas mensuales o >5 proyectos simultáneos correlacionan con burnout. Pico de abandono en 4-5 años de antigüedad, sugiriendo "ventana crítica".',
            image: "/images/ml-correlation.png",
            codeExample: `
              import pandas as pd
              import seaborn as sns
              # CORRELATION MATRIX
              corr = df2.corr()

              # Create a mask to include all variables, ensuring 'satisfaction_level' is kept
              # Sort by correlation with 'left' but keep all variables
              correlation_with_left = corr['left'].sort_values(ascending=False)
              mask = correlation_with_left.index  # Use all indices without deleting 'left' initially

              # Plot the graphic with adjusted size to fit all variables
              plt.figure(figsize=(12, 10))  # Reduced height to fit better, adjust as needed
              sns.heatmap(corr.loc[mask, mask], annot=True, fmt='.2f', cmap='coolwarm', vmin=-1, vmax=1, 
                          annot_kws={"size": 8})  # Reduced font size for annotations to 8
              plt.title('Correlation Heatmap for Salifort Motors')
              plt.xticks(rotation=45, ha='right')  # Rotate x-axis labels for better readability
              plt.yticks(rotation=0)  # Keep y-axis labels horizontal
              plt.tight_layout()  # Adjust layout to prevent clipping
              plt.show()

              # Print the correlation values for reference
              print("Correlation Values per Variable:")
              print()
              print(correlation_with_left)`,
          },
          {
            title: "Construct - Desarrollo de Modelos",
            description:
              "Estratificación de datos: 80% entrenamiento (con validación 80/20 interna), 20% test holdout. Oversampling manual de clase minoritaria (left=1) solo en conjunto de entrenamiento para evitar data leakage. Modelos construidos: Logistic Regression (baseline, Pseudo-R² 0.15), Decision Tree, Random Forest (con/sin upsampling), SVM, XGBoost (campeón), CatBoost. Optimización de hiperparámetros vía k-fold cross-validation.",
            codeExample: ` from sklearn.model_selection import train_test_split 
              y = df2['left']
              X = df2.drop("left", axis=1)

              # Split into train (80%) and test (20%) with stratification
              X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, stratify=y, random_state=0)

              # Further split train into training (80%) and validation (20%) with stratification
              X_tr, X_val, y_tr, y_val = train_test_split(X_train, y_train, test_size=0.20, stratify=y_train, random_state=0)

              # Manual oversampling of the minority class
              X_tr_majority = X_tr[y_tr == 0]
              X_tr_minority = X_tr[y_tr == 1]
              y_tr_majority = y_tr[y_tr == 0]
              y_tr_minority = y_tr[y_tr == 1]

              n_majority = len(y_tr_majority)
              X_tr_minority_upsampled, y_tr_minority_upsampled = resample(X_tr_minority, y_tr_minority,
                                                                          replace=True,
                                                                          n_samples=n_majority,
                                                                          random_state=0)

              X_tr_resampled = pd.concat([X_tr_majority, X_tr_minority_upsampled])
              y_tr_resampled = pd.concat([y_tr_majority, y_tr_minority_upsampled])`,
          },
          {
            title: "Validación de Supuestos",
            description:
              "Para Logistic Regression: verificación de outcome binario, independencia de observaciones, ausencia de multicolinealidad (VIF <5), tamaño de muestra suficiente. Para modelos tree-based: validación de profundidad óptima, número de estimadores, tasas de aprendizaje. Implementación de SHAP values para interpretabilidad del modelo XGBoost campeón.",
            codeExample: `
              # Hiperparámetros óptimos XGBoost
              best_params = {
                  'learning_rate': 0.1,
                  'max_depth': 6,
                  'n_estimators': 300,
                  'scale_pos_weight': 4.94,  # Ajuste por desbalance
                  'subsample': 0.8,
                  'colsample_bytree': 0.8
              }

              # Umbral óptimo via ROC curve
              optimal_threshold = 0.4943  # Maximiza True Positives`,
            image: "/images/ml-xgboost-feature.png",
          },
          {
            title: "Execute - Evaluación y Despliegue",
            description:
              "Métricas de evaluación en test set: F1-Score, Recall, Precision, Accuracy, AUC. XGBoost emergió como modelo campeón con F1: 0.948, Recall: 0.922, Precision: 0.976, Accuracy: 0.983, AUC: 0.982. Umbral óptimo de 0.4943 determinado via curva ROC. Implementación de interfaz predictiva que acepta características de empleado y retorna probabilidad de riesgo (Low/Medium/High). Sistema listo para integración con HRIS.",
            image: ["/images/ml-roc.png"],
          },
        ],

        dashboardBreakdown: [
          "Comparación exhaustiva de 6 modelos ML con métricas estandarizadas",
          "Análisis SHAP para interpretabilidad: satisfaction_level como factor protector principal",
          "Curva ROC con umbral óptimo (0.4943) marcado para maximizar True Positives",
          "Feature importance de XGBoost identificando top 5 predictores",
          "Gráficas de dependencia SHAP mostrando interacciones no-lineales (ej: satisfaction × tenure)",
          "Matriz de confusión optimizada en test set con 92.2% de recall",
          "Visualizaciones comparativas de distribuciones entre empleados que permanecen vs abandonan",
        ],

        keyInsights: [
          "XGBoost superó a todos los modelos con 98.3% AUC y 94.8% F1-Score, capturando interacciones complejas que modelos lineales no detectan",
          "Satisfaction level <0.3 es el predictor más fuerte de abandono (correlación -0.35)",
          'Empleados con 4-5.5 años de antigüedad están en "zona crítica" de riesgo, independiente de satisfacción actual',
          "Sin promoción en 5 años: 17% de abandono vs 4% con promoción - delta de 13 puntos porcentuales",
          "Sobrecarga (>270 hrs/mes o >5 proyectos) correlaciona fuertemente con burnout y abandono",
          "El modelo identifica correctamente al 15.76% como alto riesgo, alineado con tasa real de 16.85%",
          "Interacciones no-lineales: alta satisfacción + baja antigüedad = riesgo muy bajo (efecto multiplicativo)",
          "El 92.2% de recall significa que capturamos al 92% de empleados que realmente van a irse",
        ],
        recommendations: [
          "Implementar encuestas trimestrales de satisfacción con alertas automáticas cuando caiga <0.5",
          'Crear programa de "check-ins" obligatorios para empleados en años 4-5.5 de antigüedad',
          "Establecer límites estrictos: máximo 270 horas/mes y 5 proyectos simultáneos por empleado",
          "Priorizar promociones para empleados con >3 años sin ascenso y performance score >0.7",
          "Integrar modelo XGBoost en HRIS para scoring mensual automático de riesgo de rotación",
          'Desarrollar "modelo de satisfacción virtual" para detectar desalineación entre evaluación y comportamiento',
          "Reentrenar modelo trimestralmente con datos nuevos para mantener precisión",
          "Pilotear sistema de intervención para top 100 empleados de alto riesgo identificados por el modelo",
        ],

        images: [
          "/images/ml-box-timespend.png",
          "/images/ml-violin-salario.png",
          "/images/ml-scatter-hours.png",
          "/images/ml-randforest.png",
          "/images/ml-shap-dependence.png",
          "/images/ml-shap-rlog.png",
        ],
      },

      link: "https://github.com/pprgarcia/Predictive-model-for-employee-turnover-using-XGBoost",
    },
    {
      id: "web-inmuebles",
      title: "Páginas Web",
      category: "Javascript",
      description:
        "Páginas Web funcionales y responsivas para promoción de negocios, con mapas y formulario de contactos.",
      image: "/images/web-1.jpeg",
      tags: ["React", "Google Maps", "Responsive Design"],
      metrics: [
        { title: "Responsivo:", desc: "100%" },
        { title: "SEO:", desc: "Optimizado" },
        { title: "Galería de fotos:", desc: "Con Zoom" },
        { title: "Mapa de Ubicación:", desc: "Integrado con Google Maps" },
        {
          title: "Formulario de Contacto:",
          desc: "Integrado con Google Forms",
        },
        { title: "Base de Datos:", desc: "Supabase" },
      ],
      link: "https://departamento-queretaro.vercel.app/",
    },
    {
      id: "dashboard-looker",
      title: "Looker Studio - Dashboard Pedidos",
      category: "Looker",
      description:
        "Visualización del análisis de Pedidos de 8 productos, en 8 ciudades, durante un año, con filtros dinámicos y análisis de tendencias.",
      image: "/images/looker-2.png",
      tags: ["Looker Studio"],
      metrics: [
        {
          title:
            "Análisis de Pedidos, Visor Margen de Utilidad, Tracker de pérdida de empleados, etc.",
        },
        { title: "Determinación del mejor Producto, Ciudad y Mes" },
        { title: "Tendencias" },
      ],
      detailedInfo: {
        context:
          "Dashboard reconstruido con datos ficticios para proteger la confidencialidad.",
        impact:
          "Desarrollo de dashboard de Looker Studio para determinación de estacionalidades (tendencias), de productos y desempeño de tiendas. Además de proporcionar capacidades de filtrado dinámico al reporte por medio selección de filas en las tablas resumen, o de botónes de controles.",

        businessQuestions: [
          "Este sistema ayuda a la administración de los conceptos que implican las siguientes preguntas:",
          "¿Cuáles son los Productos que tienen mayor demanda y qué ingresos generan?",
          "¿Cuáles son las Tiendas que más ingresos generan a la empresa y cuáles requieren campañas de publicidad?",
          "¿Se puede identificar un patrón de estacionalidad en los productos y/o en las tiendas?",
          "¿Cuáles son las tendencias durante el año?",
          "¿En qué meses, para qué productos y en qué tiendas hay que diseñar campañas de mercadotecnia en respuesta a la caída de pedidos?",
        ],
        process: [
          {
            title: "Extracción y Limpieza de Datos",
            description:
              "Se obtuvo la tabla de detalle de cada pedido de venta (4,762 pedidos), con las siguientes columnas: ID,	Fecha_Pedido,	Cod_Tienda,	id_producto,	Qtde,	Precio_Unitario, y los formateé para prepararlos para la ingesta en Looker.",
          },
          {
            title: "Modelado de Datos",
            description:
              'De la misma manera se modelaron 3 tablas desde la fuente primaria de datos usando la función "blending" de Looker Studio para unir tablas al estilo SQL (Ejemplo en la imagen abajo). Se hicieron 4 diferentes blends para obtener las dimensiones y métricas necesarias para las diferentes gráficas.',
            image: "/images/looker-5-blend.png",
          },
          {
            title: "Creación de Campos Calculados",
            description:
              "Hay varios campos calculados creados como por ejemplo:",
            codeExample: `Monto_Pedido  =>
             (Qtde * Precio_Unitario).

Monto_Advertencia =>
  CASE
      WHEN Cod_Tienda IN ('A1500108', 'A1500111') 
      AND Monto Pedido < 800000 THEN Monto Pedido
      ELSE NULL
  END
`,
          },
          {
            title: "Visualizaciones",
            description:
              "Creé todas las gráficas visibles para proporcionar análisis sobre cada pregunta de negocio respectiva.",
          },
          {
            title: "Identificación de Hallazgos y Conclusiones",
            description:
              "Con el conocimiento adquirido durante la exploración de los datos y el proceso de creación del dashboard, se determinaron las conclusiones y se identificaron los hallazgos. Sin embargo, la actualización de los datos permite que estos hallazgos evolucionen con el tiempo.",
          },
          {
            title: "Publicación y Actualización",
            description:
              "Publiqué el Dashboard y lo puedes revisar en esta dirección.",
            src: "https://lookerstudio.google.com/reporting/5487a474-911b-4b6d-b159-750aa18831ba",
          },
        ],
        dashboardBreakdown: [
          "Las tablas contienen filtros que permiten que las gráficas debajo de ellas se ajusten basándose en las selecciones",
          "En este ejemplo los filtros no son globales para todo el dashboard, sino que aplican sólo a las gráficas relacionadas con cada página",
          "En la segunda página, la gráfica muestra la acumulación del valor y cantidades de los pedidos por producto, teniendo la opción de seccionar por Mes.",
          'Puedes elegir uno o varios productos desde el botón "Elige un Producto" para que la gráfica te muestre la dimensión de los pedidos de ese producto, en cada cidudad, durante el periodo de tiempo que elijas',
          "Las imágenes también responden a la elección del producto y esta funcionalidad esta diseñada para identificar los productos, sobre todo cuando los mismos son del mismo tipo, o su nombre es similar, y hay que diferenciarlos por características específicas de la imagen",
          "En las siguientes páginas, se puede analizar el comportamiento de los pedidos por producto o por tienda, y observar las tendencias durante el año",
        ],
        keyInsights: [
          "La tienda ubicada en Cancún sólo representa el 0.37% del total de pedidos. Si esta en apertura puede ser normal, pero de otra manera se recomienda una campaña de publicidad dirigida a esa ubicación, o considerar el cierre de la misma.",
          "El análisis de los pedidos revela que el Bolso es el producto más relevante por valor, generando más de $22 millones de pesos en pedidos, seguido de la Mochila y la Maleta.",
          "En términos de distribución geográfica, las ciudades de Tijuana, Puebla y León son los principales motores de ventas, contribuyendo con el mayor monto en pedidos.",
          "De manera global en Marzo y Mayo se obtuvieron el mayor valor de pedidos.",
          "Estos datos confirman dónde se deben centrar los esfuerzos de inventario y marketing para maximizar la rentabilidad.",
        ],
        images: [
          "/images/looker-4-filtros.png",
          "/images/looker-3.png",
          "/images/looker-6-producto.png",
          "/images/looker-7-bolsa.png",
          "/images/looker-8-producto.png",
          "/images/looker-9-mapa.png",
        ],

        link: "https://lookerstudio.google.com/reporting/5487a474-911b-4b6d-b159-750aa18831ba",

        process_2: [
          {
            title: "Dashboard con enfoque clásico",
            description:
              "Si lo que buscas es un dashboard con un enfoque más clásico, puedes revisar este otro dashboard que desarrollé en Looker Studio para análisis de margen de utilidad. El cual contiene tarjetas para totales y controles de filtros globles para todo el dashboard.",
            src: "https://lookerstudio.google.com/reporting/9c08782e-e833-437b-96fb-17b37314c37e",
          },
        ],

        images_2: [
          "/images/looker-1-daylight.png",
          "/images/looker-1.1-daylight.png",
        ],
      },
    },
    {
      id: "tableau-superstore",
      title: "Análisis de Rentabilidad - Tableau",
      category: "Business Intelligence",
      description:
        "Story interactiva que analiza el impacto de descuentos en la rentabilidad de un negocio retail, identificando oportunidades de optimización por $200K anuales.",
      image: "/images/tableau-cover.png",
      tags: ["Tableau", "Business Intelligence", "Retail Analytics"],
      metrics: [
        { title: "51,290 transacciones analizadas" },
        { title: "$200K impacto anual" },
        { title: "-52% margen por descuentos >20%" },
      ],

      detailedInfo: {
        context:
          "Análisis del Superstore Dataset con 51,290 transacciones de un negocio retail multi-mercado durante el período 2012-2015. Story interactiva en Tableau Public que demuestra habilidades en Business Intelligence, storytelling con datos y análisis financiero.",

        impact:
          "Identificación de $849K en pérdidas acumuladas por estrategia de descuentos mal calibrada, representando un promedio de $200K anuales en oportunidades de recuperación. El análisis revela que descuentos superiores al 20% generan un margen negativo del -52%, mientras que aproximadamente el 50% de productos con descuentos altos operan a pérdida.",

        businessQuestions: [
          "Este sistema ayuda a la administración de los conceptos que implican las siguientes preguntas:",
          "¿Los descuentos están generando pérdidas netas para el negocio?",
          "¿Qué nivel de descuento maximiza volumen sin sacrificar rentabilidad?",
          "¿Qué productos específicos tienen margen negativo y requieren atención inmediata?",
          "¿Existen diferencias de rentabilidad por mercado geográfico?",
          "¿Cuál es el impacto financiero cuantificable de la estrategia actual de descuentos?",
        ],

        process: [
          {
            title: "Exploración y Preparación de Datos",
            description:
              "Análisis de 51,290 registros de transacciones abarcando 4 mercados globales (US, EU, APAC, LATAM). Validación de integridad de datos, identificación de campos clave y creación de métricas calculadas para análisis de rentabilidad.",
          },
          {
            title: "Desarrollo de Campos Calculados",
            description:
              "Creación de campo calculado para agrupar descuentos en rangos estratégicos que permiten identificar puntos de inflexión en la rentabilidad. También se calculó el Profit Margin como métrica principal de análisis.",
            codeExample: `// Campo: Grupo Descuento
    IF [Discount] = 0 THEN "0%"
    ELSEIF [Discount] < 0.05 THEN "1-5%"
    ELSEIF [Discount] < 0.10 THEN "6-10%"
    ELSEIF [Discount] < 0.15 THEN "11-15%"
    ELSEIF [Discount] <= 0.20 THEN "16-20%"
    ELSE "Más de 20%"
    END

    // Campo: Profit Margin
    SUM([Profit]) / SUM([Sales])`,
          },
          {
            title: "Análisis de Dispersión por Producto",
            description:
              "Desarrollo de scatter plot interactivo que visualiza la distribución de rentabilidad de 51K+ productos según nivel de descuento. Cada punto representa un producto individual, permitiendo identificar casos críticos y patrones generales.",
          },
          {
            title: "Integración Geográfica Interactiva",
            description:
              "Creación de mapa de calor geográfico sincronizado con el análisis de productos mediante Actions. Los usuarios pueden hacer click en cualquier país para filtrar dinámicamente todas las visualizaciones y explorar rentabilidad por mercado específico.",
          },
          {
            title: "Desarrollo de Story Narrativa",
            description:
              "Construcción de narrativa guiada en 5 Story Points: Contexto (51K transacciones, 4 mercados) → Pregunta de Negocio → Análisis de Impacto (-52% margen) → Exploración Interactiva (mapa + scatter) → Conclusiones y Recomendaciones ($200K anuales recuperables).",
          },
          {
            title: "Cuantificación de Impacto Financiero",
            description:
              "Cálculo detallado del impacto económico: $849K en pérdidas totales durante 2012-2015, equivalente a ~$200K anuales. Identificación de casos extremos con pérdidas individuales de hasta $49K en productos con descuentos del 60%.",
          },
          {
            title: "Publicación y Actualización",
            description:
              "Publiqué el Dashboard y lo puedes revisar en esta dirección.",
            src: "https://public.tableau.com/app/profile/jos.rodr.guez.garc.a/viz/SuperTienda-AnlisisdeRentabilidad/SuperTiendaAnlisisdeRentabilidad",
          },
        ],

        dashboardBreakdown: [
          "Mapa interactivo de calor por mercado geográfico con capacidad de drill-down",
          "Scatter plot con 51,290+ puntos de datos mostrando rentabilidad individual por producto",
          "Filtros cross-dashboard sincronizados: selección en mapa afecta todas las visualizaciones",
          "KPIs dinámicos que se actualizan en tiempo real según filtros aplicados",
          "Tooltips enriquecidos con métricas contextuales: producto, ventas, profit, descuento, margen",
          "Color coding estratégico: verde para productos rentables, rojo para pérdidas",
          "Instrucciones de interactividad visibles para guiar la exploración del usuario",
        ],

        keyInsights: [
          "Descuentos superiores al 20% generan un margen NEGATIVO del -52%, resultando en pérdidas sistemáticas",
          "Aproximadamente el 50% de productos con descuentos altos operan a pérdida, visible en la proporción rojo/verde del scatter plot",
          "Pérdidas totales identificadas: $849K en el período 2012-2015, equivalente a ~$200K anuales",
          "Casos extremos críticos: Productos individuales con descuentos del 60% pierden hasta $49K cada uno",
          "Oportunidad de recuperación: Implementar límite de descuento máximo del 15% podría recuperar hasta $200K por año",
          "La interactividad geográfica revela que diferentes mercados tienen patrones distintos de rentabilidad",
        ],

        images: [
          "/images/tableau-intro.png",
          "/images/tableau-descuentos.png",
          "/images/tableau-profit&loss-by-product.png",
          "/images/tableau-estacionalidad.png",
          "/images/tableau-clientes.png",
          "/images/tableau-conclusiones.png",
        ],
      },

      link: "https://public.tableau.com/app/profile/jos.rodr.guez.garc.a/viz/SuperTienda-AnlisisdeRentabilidad/SuperTiendaAnlisisdeRentabilidad",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <h1
            className={`text-2xl font-bold transition-colors ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
          >
            José Rodríguez García
          </h1>
          <div className="hidden md:flex space-x-8">
            {["home", "about", "skills", "projects", "contact"].map(
              (section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section
                      ? scrolled
                        ? "text-blue-600 font-semibold"
                        : "text-white font-semibold"
                      : scrolled
                        ? "text-gray-600 hover:text-blue-600"
                        : "text-gray-200 hover:text-white"
                  }`}
                >
                  {section === "home"
                    ? "Inicio"
                    : section === "about"
                      ? "Acerca"
                      : section === "skills"
                        ? "Habilidades"
                        : section === "projects"
                          ? "Proyectos"
                          : "Contacto"}
                </button>
              ),
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 pt-20"
      >
        <div className="max-w-6xl w-full mx-auto px-6 text-center">
          <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-12 md:p-24 transform hover:scale-[1.01] transition-transform duration-300">
            <div className="mb-10">
              <div className="w-56 h-56 mx-auto rounded-full overflow-hidden bg-gray-200 border-4 border-gray-100 shadow-xl">
                <img
                  src="/images/JRG.JPG"
                  alt="José Rodríguez García"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4 tracking-wide">
              José Rodríguez
            </h1>

            <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mb-8"></div>

            <div className="mb-12">
              <h2 className="text-2xl md:text-4xl text-gray-800 font-bold tracking-tight">
                Analytics Engineer · Automatización Financiera & Fiscal
              </h2>
              <br></br>
              <p className="text-xl md:text-2xl text-gray-500 font-light mt-2">
                | Big Four | C1 English |
              </p>
            </div>

            {/* BARRA DE CONTACTO HÍBRIDA */}
            <div className="flex flex-wrap justify-center gap-4 items-center">
              {/* BOTÓN: TELÉFONO (Oficina / Alternativo) */}
              <div className="relative flex items-center group">
                <button
                  onClick={() =>
                    copyToClipboard("+524425973753", setCopiedPhone)
                  }
                  className={`w-14 h-14 rounded-full flex items-center justify-start px-4 transition-all duration-300 shadow-md overflow-hidden ${
                    copiedPhone
                      ? "bg-indigo-600 w-52"
                      : "bg-yellow-400 hover:w-64"
                  }`}
                >
                  <Phone
                    className={`w-6 h-6 shrink-0 ${copiedPhone ? "text-white" : "text-gray-800"}`}
                  />
                  <span
                    className={`ml-4 font-bold whitespace-nowrap transition-opacity ${
                      copiedPhone
                        ? "opacity-100 text-white text-xs"
                        : "opacity-0 group-hover:opacity-100 text-gray-800 text-sm"
                    }`}
                  >
                    {copiedPhone ? "¡NÚMERO COPIADO!" : "+524425973753"}
                  </span>
                </button>
              </div>

              {/* BOTÓN: EMAIL */}
              <div className="relative flex items-center group">
                <button
                  onClick={() =>
                    copyToClipboard("pprgarcia.jr@gmail.com", setCopiedMail)
                  }
                  className={`w-14 h-14 rounded-full flex items-center justify-start px-4 transition-all duration-300 shadow-md overflow-hidden ${
                    copiedMail ? "bg-gray-800 w-64" : "bg-yellow-400 hover:w-80"
                  }`}
                >
                  <Mail
                    className={`w-6 h-6 shrink-0 ${copiedMail ? "text-yellow-400" : "text-gray-800"}`}
                  />
                  <span
                    className={`ml-4 font-bold whitespace-nowrap transition-opacity ${
                      copiedMail
                        ? "opacity-100 text-white text-xs"
                        : "opacity-0 group-hover:opacity-100 text-gray-800 text-sm"
                    }`}
                  >
                    {copiedMail ? "¡CORREO COPIADO!" : "pprgarcia.jr@gmail.com"}
                  </span>
                </button>
              </div>

              {/* LINK: LINKEDIN (Expansión con Navegación Directa) */}
              <div className="relative flex items-center group">
                <a
                  href="https://www.linkedin.com/in/josé-rodríguez-garcía-4b32733b9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-yellow-400 hover:bg-[#0077b5] hover:w-64 flex items-center justify-start px-4 transition-all duration-300 shadow-md overflow-hidden group/link"
                >
                  {/* Icono de LinkedIn */}
                  <Linkedin className="w-6 h-6 shrink-0 text-gray-800 group-hover/link:text-white transition-colors" />

                  {/* Texto: Indica que es una visita, no una copia */}
                  <span className="ml-4 font-bold text-white text-sm opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    VISITAR PERFIL PROFESIONAL
                  </span>
                </a>
              </div>
            </div>

            <button
              onClick={() => scrollToSection("about")}
              className="mt-12 text-gray-500 hover:text-gray-700 transition-colors animate-bounce"
            >
              <div className="text-sm mb-2 font-bold tracking-widest uppercase">
                Conoce más
              </div>
              <div className="text-2xl">↓</div>
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      {/* Sección Acerca de mí - Versión Ampliada */}
      <section id="about" className="py-24 bg-white">
        {/* Cambiamos max-w-4xl por max-w-6xl para ganar amplitud */}
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center italic tracking-tighter">
            Acerca de mí
          </h2>

          {/* Aumentamos el padding interno (p-12 md:p-20) y suavizamos el redondeado */}
          {/*<div className="bg-gray-50 rounded-[3rem] p-10 md:p-20 shadow-sm border border-gray-100">*/}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-black text-indigo-600 italic tracking-tighter mb-6">
              "CONSTRUYO PUENTES DONDE LOS ERPs TRADICIONALES FALLAN."
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Soy <strong>Financial Data Analyst & Analytics Engineer</strong>{" "}
              con más de 16 años de experiencia en alta gerencia y auditoría{" "}
              <strong>(Big Four)</strong>.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed font-medium border-t border-gray-200 pt-8 italic">
              Mi especialidad es eliminar la fragilidad operativa del área
              financiera: cierres mensuales caóticos, archivos de Excel con
              múltiples versiones o sin estructura consistente, procesos
              manuales sin estandarizar, errores de tipo de cambio,
              discrepancias entre papeles de trabajo y falta de trazabilidad.
            </p>

            <br></br>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              He vivido estos problemas en primera persona como Auditor y
              Gerente Financiero. Por eso diseño e implemento{" "}
              <strong>pipelines ETL y sistemas de gobernanza</strong> que
              resuelven estos dolores de raíz con{" "}
              <strong>lógica determinística,</strong> trazabilidad forense y
              precisión decimal.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Creo firmemente en la potenciación que resulta del uso responsable
              de la IA. Desarrollo herramientas locales y determinísticas que
              aprovechan la inteligencia artificial para crear automatizaciones
              confiables, manteniendo el{" "}
              <strong>
                control total de los datos sensibles dentro de la organización.
              </strong>{" "}
              De esta forma se obtiene el poder de la IA sin comprometer la
              confidencialidad ni la trazabilidad que exigen los temas
              financieros, fiscales, legales y de propiedad intelectual.
            </p>
            <h3 className="text-lg font-bold text-gray-800 mb-6">
              Mi diferencial es la combinación de tres mundos:
            </h3>
            <ul className="space-y-4">
              <li className="text-lg text-gray-700 leading-relaxed ml-4">
                • La rigurosidad del cumplimiento financiero (IFRS, NIFs) y
                fiscal mexicano
              </li>
              <li className="text-lg text-gray-700 leading-relaxed ml-4">
                • La capacidad de construir soluciones técnicas modernas
                (Python, React, automatización)
              </li>
              <li className="text-lg text-gray-700 leading-relaxed ml-4">
                • La visión estratégica de quien ha sido responsable de los
                números en la práctica
              </li>
            </ul>
            <br></br>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Especializado en transformar procesos manuales de finanzas y
              cumplimiento fiscal en sistemas robustos, auditables y escalables.
            </p>
          </div>
          <br />
          <br />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">
                Data Visualization
              </h3>
              <p className="text-sm text-gray-600">
                Dashboards claros y Herramientas Administrativas
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center">
              <Database className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">
                Data Analysis
              </h3>
              <p className="text-sm text-gray-600">
                Insights profundos de los datos
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl text-center">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">
                Machine Learning
              </h3>
              <p className="text-sm text-gray-600">
                Modelos predictivos precisos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Habilidades Técnicas
          </h2>

          {/* Grid de Habilidades */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-3">{skill.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {skill.name}
                </h3>
                <p className="text-sm text-gray-600">{skill.level}</p>
              </div>
            ))}
          </div>

          {/* Bloque de Certificaciones */}
          <div className="mt-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <Award className="w-7 h-7 text-blue-600" />
              Certificaciones Profesionales
            </h3>

            <div className="space-y-6">
              {/* 1. GOOGLE CERTIFICATE */}
              <div className="relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-transparent rounded-2xl border border-blue-100 group hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-5 z-10">
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-xl shadow-sm border border-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img
                      src="https://www.gstatic.com/images/branding/product/2x/googleg_64dp.png"
                      alt="Google"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 leading-tight mb-1">
                      Google Advanced Data Analytics
                    </h4>
                    <p className="text-blue-700 font-semibold text-sm mb-3">
                      Google Professional Certificate | Coursera
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Python",
                        "Machine Learning",
                        "Estadística",
                        "Storytelling",
                      ].map((s) => (
                        <span
                          key={s}
                          className="px-2 py-1 bg-white/60 border border-blue-200 text-blue-700 text-[10px] font-bold uppercase rounded-md"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <a
                  href="https://coursera.org/verify/professional-cert/PP26T9DQKCND"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 md:mt-0 z-10 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md"
                >
                  Validar Credencial <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* 2. CREHANA + ULA MICRODEGREE */}
              <div className="relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 group hover:shadow-lg transition-all duration-300">
                {/* Decoración de fondo sutil */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-purple-50 opacity-40 rounded-full blur-3xl"></div>

                <div className="flex items-start gap-5 z-10">
                  {/* Contenedor del Logo de ULA */}
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden p-2">
                    <img
                      src="/images/ULA.png"
                      alt="ULA Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-900 leading-tight mb-1">
                      MicroDegree en Data Analytics
                    </h4>
                    <p className="text-purple-700 font-semibold text-sm mb-3">
                      Universidad Latinoamericana (ULA) + Crehana
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {[
                        "SQL",
                        "Excel Avanzado",
                        "Tableau",
                        "Business Intelligence",
                      ].map((s) => (
                        <span
                          key={s}
                          className="px-2 py-1 bg-purple-50 border border-purple-100 text-purple-700 text-[10px] font-bold uppercase rounded-md"
                        >
                          {s}
                        </span>
                      ))}
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded-md shadow-sm">
                        150 Horas
                      </span>
                    </div>
                  </div>
                </div>

                {/* BOTÓN DE VALIDACIÓN */}
                <a
                  href="https://s3.amazonaws.com/public-lessons.crehana.com/images/certificate/participation-pdf/7a084e82/4b8bbbb5.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 md:mt-0 z-10 flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-xl text-sm font-bold hover:bg-black transition-all shadow-md hover:shadow-gray-200"
                >
                  Validar Credencial
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Proyectos Destacados
          </h2>
          <p className="text-center text-indigo-700 font-bold rounded-2xl mb-12 max-w-2xl mx-auto">
            ETL, Dashboards y Sistemas que demuestran mi capacidad para
            convertir datos en valor empresarial.
          </p>
          <div className="space-y-12">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="text-sm text-blue-600 font-semibold mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mb-4 space-y-3">
                      {project.metrics.map((metric, imt) => (
                        <div
                          key={imt}
                          className="flex items-start text-sm text-gray-600 leading-relaxed"
                        >
                          {/* El Bullet: flex-shrink-0 evita que se aplaste, mt-1.5 lo alinea con el primer renglón */}
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>

                          <span>
                            <strong className="text-gray-800 font-bold">
                              {metric.title}
                            </strong>{" "}
                            {metric.desc}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        if (project.detailedInfo) {
                          setSelectedProject(project);
                        } else if (project.link) {
                          window.open(project.link, "_blank");
                        }
                      }}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                    >
                      Ver descripción completa{" "}
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-24 bg-gradient-to-br from-blue-700 to-indigo-900 text-white"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
            ¿Listo para transformar tus datos?
          </h2>

          <p className="text-lg md:text-xl mb-12 text-blue-100 font-light leading-relaxed">
            Especialista certificado en{" "}
            <span className="text-yellow-400 font-bold">
              Analítica Avanzada
            </span>{" "}
            con un enfoque Operativo Disruptivo{" "}
            <span className="text-yellow-400 font-bold">
              para el desarrollo de soluciones web a medida
            </span>{" "}
            para optimizar la gestión contable-administrativa.
            <br />
            <br />
            Construyo herramientas inteligentes que no solo visualizan datos,
            sino que{" "}
            <span className="underline decoration-yellow-400 decoration-2 underline-offset-4 font-semibold text-white">
              auditan y automatizan
            </span>{" "}
            el flujo real de tu información con tecnología escalable,
            complementando la capacidad de tu{" "}
            <span className="text-white font-bold italic tracking-wider">
              ERP o sistemas actuales,
            </span>{" "}
            para administrar riesgos que hoy <strong>viven</strong> en archivos
            de Excel y se manifiestan en la{" "}
            <strong>operación real de tu negocio</strong>. Hablemos sobre cómo
            llevar tu administración más allá de las gráficas, implementando
            tecnología propia donde las soluciones comerciales se quedan cortas.
          </p>

          {/* GRUPO DE ICONOS UNIFICADOS */}
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {/* WHATSAPP - Único número */}
            <div className="relative flex items-center group">
              <button
                onClick={() =>
                  copyToClipboard("+524425973753", setCopiedWhatsapp)
                }
                className={`w-14 h-14 rounded-full flex items-center justify-start px-4 transition-all duration-300 shadow-xl overflow-hidden ${
                  copiedWhatsapp
                    ? "bg-emerald-500 w-52"
                    : "bg-yellow-400 hover:bg-emerald-500 hover:w-64"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`w-6 h-6 shrink-0 ${copiedWhatsapp ? "fill-white" : "fill-gray-800 group-hover:fill-white"}`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.554 4.189 1.604 6.008L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.632 0 12.032-5.396 12.035-12.03a11.79 11.79 0 00-3.526-8.511" />
                </svg>
                <span
                  className={`ml-4 font-bold whitespace-nowrap transition-opacity duration-300 ${
                    copiedWhatsapp
                      ? "opacity-100 text-white text-sm"
                      : "opacity-0 group-hover:opacity-100 text-white text-sm"
                  }`}
                >
                  {copiedWhatsapp ? "¡Copiado!" : "+524425973753"}
                </span>
              </button>
            </div>

            {/* EMAIL - Híbrido (Copia) */}
            <div className="relative flex items-center group">
              <button
                onClick={() =>
                  copyToClipboard("pprgarcia.jr@gmail.com", setCopiedMail)
                }
                className={`w-14 h-14 rounded-full flex items-center justify-start px-4 transition-all duration-300 shadow-xl overflow-hidden ${
                  copiedMail
                    ? "bg-gray-900 w-64"
                    : "bg-yellow-400 hover:bg-gray-800 hover:w-80"
                }`}
              >
                <Mail
                  className={`w-6 h-6 shrink-0 transition-colors ${copiedMail ? "text-yellow-400" : "text-gray-800 group-hover:text-white"}`}
                />
                <span
                  className={`ml-4 font-bold whitespace-nowrap transition-opacity duration-300 ${
                    copiedMail
                      ? "opacity-100 text-white text-[10px]"
                      : "opacity-0 group-hover:opacity-100 text-white text-sm"
                  }`}
                >
                  {copiedMail ? "¡CORREO COPIADO!" : "pprgarcia.jr@gmail.com"}
                </span>
              </button>
            </div>

            {/* LINKEDIN - Expansión (Link) */}
            <div className="relative flex items-center group">
              <a
                href="https://www.linkedin.com/in/josé-rodríguez-garcía-4b32733b9"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-yellow-400 hover:bg-[#0077b5] hover:w-64 flex items-center justify-start px-4 transition-all duration-300 shadow-xl overflow-hidden group/link"
              >
                <Linkedin className="w-6 h-6 shrink-0 text-gray-800 group-hover/link:text-white transition-colors" />
                <span className="ml-4 font-bold text-white text-sm opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  VISITAR PERFIL PROFESIONAL
                </span>
              </a>
            </div>

            {/* TABLEAU - Expansión (Link) */}
            <div className="relative flex items-center group">
              <a
                href="https://public.tableau.com/app/profile/jos.rodr.guez.garc.a/viz/SuperTienda-AnlisisdeRentabilidad/SuperTiendaAnlisisdeRentabilidad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-yellow-400 hover:bg-orange-600 hover:w-64 flex items-center justify-start px-4 transition-all duration-300 shadow-xl overflow-hidden group/tableau"
              >
                <BarChart3 className="w-6 h-6 shrink-0 text-gray-800 group-hover/tableau:text-white transition-colors" />
                <span className="ml-4 font-bold text-white text-sm opacity-0 group-hover/tableau:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  PORTAFOLIO EN TABLEAU
                </span>
              </a>
            </div>
            {/* GITHUB - Expansión (Link a Repositorios) */}
            <div className="relative flex items-center group">
              <a
                href="https://github.com/pprgarcia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-yellow-400 hover:bg-gray-900 hover:w-64 flex items-center justify-start px-4 transition-all duration-300 shadow-xl overflow-hidden group/github"
              >
                {/* Icono de GitHub */}
                <Github className="w-6 h-6 shrink-0 text-gray-800 group-hover/github:text-white transition-colors" />

                {/* Texto: Resalta tu capacidad técnica */}
                <span className="ml-4 font-bold text-white text-sm opacity-0 group-hover/github:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  REPOSITORIOS DE CÓDIGO
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>
            © 2026 José Rodríguez García. Desarrollado con React y desplegado en
            Vercel
          </p>
        </div>
      </footer>

      {/* Modal de proyecto */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
