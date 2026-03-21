import React, { useState, useEffect } from "react";
import {
  BarChart3,
  Database,
  TrendingUp,
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  Phone,
  X,
} from "lucide-react";

const ProjectModal = ({ project, onClose }) => {
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
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center rounded-t-2xl z-10">
            <div>
              <div className="text-sm text-blue-600 font-semibold mb-1">
                {project.category}
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="px-8 py-8 space-y-12">
            {/* Imagen principal */}
            <img
              src={project.image}
              alt={project.title}
              className="max-w-8xl mx-auto rounded-xl shadow-lg"
            />

            {/* Contexto */}
            {/* Contexto - CÓDIGO CORREGIDO */}
            <div>
              {/* Esta línea convierte el texto en arreglo automáticamente si no lo es */}
              {(Array.isArray(details.context)
                ? details.context
                : [details.context]
              ).map((paragraph, i) => (
                <p className="text-gray-600 italic mb-4" key={i}>
                  {paragraph}
                </p>
              ))}
              <p className="text-lg text-gray-800 leading-relaxed">
                {details.impact}
              </p>
            </div>

            {/* Preguntas de Negocio */}
            {details.businessQuestions && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Preguntas de Negocio
                </h3>
                <div className="bg-blue-50 rounded-xl p-6">
                  <ol className="space-y-3">
                    {details.businessQuestions.map((question, idxbq) => (
                      <li key={idxbq} className="text-gray-700">
                        <span className="font-semibold text-blue-600">
                          {idxbq + 1}.
                        </span>{" "}
                        {question}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* Proceso */}
            {details.process && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Proceso de Desarrollo
                </h3>
                <div className="space-y-8">
                  {details.process.map((step, idxpr) => (
                    <div
                      key={idxpr}
                      className="border-l-4 border-blue-500 pl-6"
                    >
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">
                        {idxpr + 1}. {step.title}
                      </h4>
                      {(Array.isArray(step.description)
                        ? step.description
                        : [step.description]
                      ).map((paragraph, i) => (
                        <p className="text-gray-700 mb-4" key={i}>
                          {paragraph}
                        </p>
                      ))}
                      {step.image &&
                        (Array.isArray(step.image)
                          ? step.image
                          : [step.image]
                        ).map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`${step.title} ${i + 1}`}
                            className="max-w-4xl mx-auto rounded-lg shadow-md mb-4"
                          />
                        ))}
                      {step.src && (
                        <a
                          href={step.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg mt-4"
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
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Características del Dashboard
                </h3>
                <div className="bg-gray-50 rounded-xl p-6">
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
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Insights Clave
                </h3>
                <div className="bg-green-50 rounded-xl p-6">
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
                  Galería
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {details.images.map((img, idxim) => (
                    <img
                      key={idxim}
                      src={img}
                      alt={`Screenshot ${idxim + 1}`}
                      className="w-full rounded-lg shadow-md"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Proceso_2 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Dashboards adicionales
              </h3>
              <div className="space-y-8">
                {details.process_2?.map((step, idxpr2) => (
                  <div key={idxpr2} className="border-l-4 border-blue-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                      {idxpr2 + 1}. {step.title}
                    </h4>
                    <p className="text-gray-700 mb-4">{step.description}</p>
                    {step.image && (
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full rounded-lg shadow-md mb-4"
                      />
                    )}
                    {step.src && (
                      <a
                        href={step.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg mt-4"
                      >
                        👁️ Ver Dashboard
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

            {/* Imágenes adicionales 2*/}
            {details.images_2 && details.images_2.length > 1 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Otros Dashboards
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {details.images_2.map((img2, idxim2) => (
                    <img
                      key={idxim2}
                      src={img2}
                      alt={`Screenshot ${idxim2 + 1}`}
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
    {
      name: "React",
      icon: "⚛️",
      level: "Hooks, Context API, Reusable Components",
    },
    { name: "Power BI", icon: "📊", level: "DAX, Power Query, Data Modeling" },
  ];

  const projects = [
    {
      id: "react-supertienda-admin",
      title: "SuperTienda Analytics - Custom Web App",
      category: "Full Stack Development / Data Science",
      description:
        "Aplicación web de analítica a medida desarrollada con Next.js y Python. Procesa 50k+ registros para diagnosticar fugas de capital y optimizar la rentabilidad operativa mediante una arquitectura de microservicios.",
      image: "/images/admintool_main.png",
      tags: [
        "Next.js",
        "React",
        "Python FastAPI",
        "Pandas/Python",
        "Tailwind CSS",
        "Recharts",
      ],
      metrics: [
        "Arquitectura Desacoplada (Back/Front)",
        "API RESTful Custom",
        "Renderizado Híbrido",
      ],

      detailedInfo: {
        context:
          'A diferencia de las herramientas tradicionales de BI (Tableau/PowerBI), este proyecto consiste en el desarrollo de un software de analítica personalizado "In-House". El objetivo fue crear una solución escalable, sin costos de licenciamiento por usuario y con total flexibilidad en la visualización de datos, conectando un backend de procesamiento robusto (Python) con un frontend de alto rendimiento (React).',

        impact:
          "La herramienta permite democratizar el acceso a los datos operativos sin depender de licencias costosas. Técnicamente, reduce la carga cognitiva del usuario mediante interfaces limpias y tooltips contextuales inteligentes. A nivel de negocio, valida matemáticamente la pérdida de $920K USD por descuentos mal aplicados y desmiente mitos sobre los costos logísticos, reorientando la estrategia comercial de la empresa.",

        businessQuestions: [
          "¿Es posible detectar programáticamente anomalías en márgenes de utilidad en tiempo real?",
          "¿Cómo impactan los descuentos agresivos (>20%) en la erosión del capital neto?",
          "¿Existe una correlación directa entre altos costos de envío y pérdidas operativas?",
          "¿Quiénes son realmente los clientes VIP que sostienen la rentabilidad del negocio?",
          "¿Qué subcategorías de productos (como Mesas) requieren una reestructuración inmediata de precios?",
        ],

        process: [
          {
            title: "Ingeniería de Datos y Backend (Python/FastAPI)",
            description:
              "Desarrollo de una API RESTful con FastAPI. Procesamiento de datos crudos (CSV/Excel) utilizando Pandas para limpieza, tipado y agregaciones complejas (GroupBys, Pivot Tables). Implementación de endpoints específicos para cada módulo de análisis para optimizar la transferencia de datos (payloads ligeros).",
            codeSnippet: "Python, Pandas/Python, FastAPI, Docker",
            image: "/images/admintool-python.png",
          },
          {
            title: "Arquitectura Frontend (Next.js & TypeScript)",
            description:
              "Construcción de una SPA (Single Page Application) moderna utilizando Next.js. Implementación de un sistema de componentes modular y tipado estricto con TypeScript para asegurar la estabilidad. Uso de Tailwind CSS para un diseño responsivo y consistente con la identidad corporativa.",
            image: "/images/admintool-dashboard.png",
          },
          {
            title: "Visualización de Datos Avanzada",
            description:
              "Implementación de Recharts para gráficos interactivos. Desarrollo de lógica personalizada para Tooltips condicionales (lógica de colores dinámica según profit/loss, formateo inteligente de moneda/porcentajes). Creación de gráficos compuestos (Bar + Line) y Scatter Plots para análisis multidimensional.",
            image: "/images/admintool-descuentos.png",
          },
          {
            title: "Despliegue y CI/CD",
            description:
              "Estrategia de despliegue desacoplada: Frontend en Vercel para optimización de entrega de contenido (CDN) y Backend en Render containerizado con Docker. Configuración de variables de entorno y manejo de CORS para comunicación segura entre cliente y servidor.",
            image: "/images/admintool-scatter.png",
          },
          {
            title: "Link al proyecto en línea",
            description:
              "Accede a la aplicación web completa para explorar el dashboard interactivo y analizar los datos de SuperTienda.",
            src: "https://supertienda-dashboard-analisis.vercel.app/",
          },
        ],

        dashboardBreakdown: [
          "Panel de Control (Dashboard): KPIs en tiempo real (Ventas, Margen, Tendencias) y resumen ejecutivo.",
          'Módulo de Descuentos: Análisis de sensibilidad que revela la "Zona de la Muerte" (Descuentos >20%).',
          'Análisis de Productos: Scatter Plot interactivo de Ventas vs. Utilidad para identificar productos "Bleeders".',
          "Gestión de Clientes: Matriz de segmentación identificando Clientes Críticos (alto volumen, margen negativo).",
          "Logística Internacional: Mapa de calor y análisis de costos de envío vs. rentabilidad por país.",
          "Conclusiones (Insights): Sección narrativa que traduce los datos en acciones de negocio concretas.",
        ],

        keyInsights: [
          "Diagnóstico de Fuga: Se confirmaron pérdidas por $920K USD concentradas exclusivamente en transacciones con descuentos superiores al 20%.",
          "Mito del Flete: Los datos desmienten que el transporte afecte el margen; países con envíos caros (+$120) siguen siendo rentables.",
          'Problema de Categoría: "Furniture" (específicamente Mesas) opera con margen negativo estructural, no coyuntural.',
          "Concentración VIP: Existe una intersección sana de clientes de alto volumen y alta rentabilidad que sostienen el crecimiento.",
          "Estacionalidad: Las caídas más pronunciadas de ventas ocurren consistentemente en Julio y Octubre.",
          "Optimización Técnica: La migración de archivo .csv a esta Web App redujo el tiempo de obtención de insights de horas a milisegundos.",
        ],

        images: [
          "/images/admintool-estacion.png", // Tu vista principal (Dashboard)
          "/images/admintool-descuentos2.png", // La gráfica de barras roja/gris (Fuga)
          "/images/admintool-productos.png", // Scatter plot o lista de productos
          "/images/admintool-clientes.png", // Gráfica de barras horizontal (Países/Clientes)
          "/images/admintool-paises.png",
          "/images/admintool-conclusiones.png", // La página de texto con los checks
        ],
      },
    },

    {
      id: "RepoDeclara",
      title:
        "RepoDeclara, Repositorio de Declaraciones Fiscales y Documentos Legales",
      category: "Sistemas Administrativos (Próximamente en la Nube)",
      description:
        "Sistema completo de documentación de declaraciones fiscales y documentos legales, para su análisis y seguimiento.",
      image: "/images/RepoDeclara-Tablero Principal.png",
      tags: ["React 19", "Next.js 16 (App Router)", "Prisma ORM", "TypeScript"],
      metrics: [
        "Digitalización de Declaraciones",
        "Listado de declaraciones (Actualizaciones y Recargos, Saldos a Favor)",
        "Compensaciones (Actualizaciones)",
        "Devoluciones (Actualizaciones e Intereses)",
        "Contratos (Seguimiento a su Cumplimiento)",
        "Pólizas (Seguimiento y Vencimiento)",
        "Seguimiento al Cumplimiento (Planeación y Asignación de actividades)",
        "Integración de papeles de trabajo por declaración",
        "Archivo Permanente (Acta Constitutiva, Poderes, Licencias, Contratos, Seguros, Proyectos, etc.)",
      ],

      detailedInfo: {
        context: [
          "En México, las empresas están obligadas a llevar contabilidad financiera, los papeles de trabajo de determinaciones fiscales se llevan en archivos de Excel y se guardan en carpetas de Windows, lo cual es un control muy precario ya que se pueden perder las versiones definitivas. Es así que, cuando es necesario agrupar la información fiscal para presentar a algún revisor (Auditor, Autoridades, Ejecutivos, Dueños, Due Dilligence, etc. ) se pierden recursos para agrupar y relacionar documentos, información y papeles de trabajo. ",
          "                            ",
          "RepoDeclara no es una calculadora fiscal, es un Repositorio que respeta los datos con los que fueron presentadas las declaraciones, los cálculos se presentan como una guía de comparación pero los datos son forenses, es decir, son una ayuda que pretende dar indicios de errores o montos inadecuados permitiendo la captura fiel de la información presentada.",
        ],

        impact:
          "Esta herramienta es la solución para conocer el estatus real y obtener evidencia de la existencia de la información fiscal y legal depositada en una base de datos (no hay versiones) en donde se documenta la historia fiscal y legal de empresas, y contribuyentes en general. Representa la oportunidad de estar preparado para cualquier revisión sin tener que emplear largas jornadas y recursos para lograrlo. Vital para evaluar riesgos, pronosticar resultados y contestar revisiones fiscales.",

        businessQuestions: [
          "¿Cuáles declaraciones se han presentado?",
          "¿Cuándo se presentaron?",
          "¿Con qué montos?",
          "¿Cuales son los saldos a favor (dinero pendiente de recuperar del SAT) y cuál es su saldo actual?",
          "Si no se pagaron los impuestos a cargo, ¿Se compensaron contra un monto a favor?",
          "¿Se calcularon actualizaciones a favor?, ¿Una parte se pagó en dinero, y otra se compensó?",
          "¿Hubo modificación de saldos a favor una vez que parcial o totalmente se compensaron?",
          "Fruto de un error en compensaciones ¿hay montos de impuestos a cargo?",
          "¿Cuáles montos a favor que se recuperaron o estan por recuperar vía devolución?",
          "¿Cuales montos fueron rechazados parcial o totalmente en el proceso de devolución por parte del SAT?",
          "¿Hubo requerimientos de información por parte del SAT?",
          "¿cuánto tiempo se bloquearon los 40 días que tiene la autoridad para responder una solicitud de devolución debido a su requerimiento de información?",
          "¿Cuál es/fue el plan de trabajo para hacer la contestación oportuna a requerimientos de información fiscales",
          "¿El SAT se negó a devolver parcialmente el monto solicitado?, ¿Por qué?",
          "¿En algún lugar esta documentado el proceso y resultado de revisiones fiscales o autoridades en general?",
          "¿Como se documenta la materialidad de transacciones importantes con impacto legal y fiscal?",
          "¿Los contratos con clientes/proveedores estan vigentes?, ¿tienen riesgos?, ¿Qué parte del cumplimiento de parte del contribuyente requiere seguimiento de un equipo de trabajo?",
          "Es seguro compartir contratos y documentos importantes mediante emails, o dispositivos electrónicos o ¿Preferirías tener todo en un sistema al que sólo acceden los que tienen que acceder y no tener que compartir con riesgos?",
          "¿Cómo se documentan las Pólizas de Seguros?, ¿Hay acceso a la información relevante en un memo?",
          "¿La gaveta física de los documentos del Archivo Permanente tiene un orden?, ¿En dónde se puede consultar la ubicación de los papeles físicos?",
          "¿En dónde se documentan los faltantes de información y el plan de trabajo para solventarlos?",
          "¿Es necesario documentar juntas periódicas, en donde se asignen actividades y responsabilidades a los integrantes de un equipo, dando seguimiento a los acuerdos y fechas acordadas?",
          "¿Te parece relevante esta herramienta?",
        ],

        process: [
          {
            title: "Creación y Edición de Sábanas",
            description: [
              "Una sábana es una declaración que tiene un Número de Operación Único, en la que se presentaron uno o más impuestos. Esta es la página de captura de información como tipo, Número de Operación, Periodo, Fecha de Presentación, elección del Impuesto que se va a documentar (Federales, Estatales, Retenciones), Monto a cargo, Monto presentado con anterioridad (si es complementaria), INPC's, Factor de Actualización, Recargos, Memo de aclaraciones, etc.",
              "Botón (Subir Acuse SAT) para subir los archivos relacionados como: la declaración en digital, Archivos relevantes para el cálculo. Los papeles de trabajo se pueden adjuntar con otro botón que es específico para cada impuesto (Soporte Documental Específico), de esta manera cuando se consulte un impuesto se obtiene toda la información capturada y los archivos globales y específicos",
              "Si el monto presentado en una declaración complementaria es menor que el presentado en la normal, se genera una monto a favor (bolsa en el sistema) que el contribuyente puede recuperar vía compensación o devolución.",
            ],
            codeSnippet: "Next.js, React",
            image: "/images/RepoDeclara-sabana.png",
          },
          {
            title: "Modal de Compensaciones",
            description: [
              "Si presionas el botón 'Gestionar Aplicaciones (Multi-Bolsa)' se abre el Distribuidor Modal de Compensaciones en el cual puedes elegir la bolsa (monto a favor) de la cual se compensó al presentar la declaración. A veces pueden ser necesarios más de un saldo a favor y se tiene que elegir el monto a aplicar. A pesar de ser un sistema forense, hace cálculos que permiten fácilmente capturar la información.",
              "Este Dsitribuidor calcula la actualización del monto (parcial o total) que se está tomando del saldo a favor, desde el momento en que nación el saldo a favor al momento de cada aplicación.",
            ],
            image: "/images/RepoDeclara-modal-multicompensacion.png",
          },
          {
            title: "Listado de Declaraciones",
            description: [
              "Cada vez que se guarda una sábana, cada impuesto se forma en su tarjeta exclusiva específica de su nombre, en donde se puede revisar la información capturada (Favor de ampliar el zoom del navegador a +175)",
              'En la columna "Compensación" se muestra el monto total compensado (Acumulación de una o más aplicaciones de diferentes bolsas) el cual se disminuye del monto pagado (columna: "Pagado / (-) Pend. Rec."), el cual puede ser "cero", o haber quedado un remanente pagado con dinero.',
              'Se puede obtener en un reporte Excel la información del tablero principal. Cabe aclarar que todos los módulos tiene una o varias versiones de Reportes Excel, hay un Reporte General en Excel con toda la información capturada en un click. También, con el botón "Bóveda de Evidencia" se pueden obtener todos los archivos (o una selección) que hayan servido de evidencia para las declaraciones (Archivos: .xlxs, .docx, pdf, imágenes, fotografías, etc.)',
            ],
            image: [
              "/images/RepoDeclara-declaraciones-1.png",
              "/images/RepoDeclara-declaraciones-2.png",
            ],
          },
          {
            title: "Modal de Resumen de declaración",
            description:
              "El modal de resumen (ventana desde la derecha que surge al dar click en botón de acciones) permite identificar instantáneamente todos los elementos que han afectado a la declaración: compensaciones, actualizaciones y recargos del monto a cargo, actualizaciones del monto a favor, monto histórico aplicado en la compensación, INPC's y Facto de actualización así como meses de recargos, Memo de aclaraciones y archivos digitales como evidencia de la información de la declaración.",
            image: "/images/RepoDeclara-resumen-modal.png",
          },
          {
            title: "Tarjetas de Reamanentes de Compensación",
            description: [
              "En estas tarjetas muestran claramente cuáles han sido las aplicaciones de cada monto a favor, con toda su información, y el saldo remanente por aplicar en el futuro (Ese saldo también se puede ver desde el Listado de Declaraciones).",
              "Se puede observar claramente el Monto a Favor Inicial, el Monto Compensado, su Monto Histórico (el que en realidad disminuye la Bolsa o Monto a Favor), los INPC's y Factor con que se calculó la Actualización a Favor en el Distribuidor Modal, y lo más importante en éste caso, el remanente por compensar hasta ese momento.",
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
            title: "Bóveda de Archivos de Evidencia ",
            description: [
              'Además de poder subir, bajar o eliminar todos los archivos desde la sección en que fueron adjuntados también tenemos la Bóveda de archivos digitales que permite descargar todos o algunos archivos seleccionándolos, en cualquier momento. Todo por medio del botón del tablero principal "Bóveda de evidencia".',
            ],
            image: [
              "/images/RepoDeclara-boveda.png",
              "/images/RepoDeclara-boveda-seleccion.png",
            ],
          },
          {
            title: "Link al proyecto en línea",
            description: [
              "Estamos en la versión Beta del sistema (haciendo pruebas) así que, cualquier comentario que nos quieras hacer, por favor dirígete a las herramimientas de comunicación de la portada.",
              "Accede a la aplicación web completa para explorar el dashboard principal y analizar los datos de RepoDeclara.",
              "Si quieres acceder a la empresa que tiene ejemplos completos puedes entrar con el usuario: administradorfy@fy.com; password: Administradorfy",
              "Si quieres accesar a las empresas de pruebas y generar tus propias capturas puedes hacerlo con: admsinempre@ey.com; password:EdmSinEmpre",
              "La empresa Empresa Young, S.A de C.V. tiene ejemplos concretos. La empresa Pruebas, S.A. de C.V. contiene algunas declaraciones pero sin compensaciones o devoluciones. Puedes entrar a generar nuevas declaraciones (sábanas) o puedes entrar a editar cualquier declaración e intentar hacer una compensación en el módulo de compensaciones (dentro de la misma sábana).",
              "La empresa SINDATOS PRUEBA2, S.A. de C.V. esta completamente vacía para que generes tus propias sábanas y escenarios",
              'También, puedes generar una captura de Solicitud, Requerimiento de información y Resolución, con datos sintéticos de tu preferencia. No nos hacemos responsables por la información que adjuntes o captures, considera que otras personas podrán ver esta versión de prueba. Cuando lancemos RepoDeclara en la versión en producción la información estará sellada sólo para los usuarios autorizados por el "administrador de la empresa" que se asigne en el sistema a cada empresa.',
              "Debido a que estamos usando una base de datos de prueba, el límite de archivos pesados es limitado. Te agradecería si al final de tu prueba borras los archivos que adjuntes, después de generar los reportes en Excel o pantallas que gustes.",
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
      metrics: ["98.3% AUC", "94.8% F1-Score", "11,991 registros analizados"],

      detailedInfo: {
        context:
          "Proyecto capstone del Google Advanced Data Analytics Certificate. Análisis completo de 14,999 registros de empleados de Salifort Motors para predecir rotación laboral y entregar recomendaciones accionables al departamento de Recursos Humanos. Implementación del framework PACE (Plan, Analyze, Construct, Execute) para desarrollo sistemático.",

        impact:
          "Desarrollo de modelo XGBoost con 98.3% AUC que identifica con precisión del 94.8% (F1-Score) a empleados en riesgo de abandono. El modelo detecta correctamente al 15.76% de empleados como alto riesgo, coincidiendo con la tasa real de rotación del 16.85%. Esto permite intervenciones proactivas que podrían ahorrar millones en costos de reclutamiento y capacitación.",

        businessQuestions: [
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
      metrics: ["100% responsivo", "Optimizado para SEO"],
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
        "Análisis de Pedidos, Visor Margen de Utilidad, Tracker de pérdida de empleados, etc.",
        "Determinación del mejor Producto, Ciudad y Mes",
        "Tendencias",
      ],
      detailedInfo: {
        context:
          "Dashboard reconstruido con datos ficticios para proteger la confidencialidad.",
        impact:
          "Desarrollo de dashboard de Looker Studio para determinación de estacionalidades (tendencias), de productos y desempeño de tiendas. Además de proporcionar capacidades de filtrado dinámico al reporte por medio selección de filas en las tablas resumen, o de botónes de controles.",

        businessQuestions: [
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
            title: "Identificación de Insights y Conclusiones",
            description:
              "Con el conocimiento adquirido durante la exploración de los datos y el proceso de creación del dashboard, se determinaron las conclusiones y se identificaron los insights. Sin embargo, la actualización de los datos permite que estos insights evolucionen con el tiempo.",
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
        "51,290 transacciones analizadas",
        "$200K impacto anual",
        "-52% margen por descuentos >20%",
      ],

      detailedInfo: {
        context:
          "Análisis del Superstore Dataset con 51,290 transacciones de un negocio retail multi-mercado durante el período 2012-2015. Story interactiva en Tableau Public que demuestra habilidades en Business Intelligence, storytelling con datos y análisis financiero.",

        impact:
          "Identificación de $849K en pérdidas acumuladas por estrategia de descuentos mal calibrada, representando un promedio de $200K anuales en oportunidades de recuperación. El análisis revela que descuentos superiores al 20% generan un margen negativo del -52%, mientras que aproximadamente el 50% de productos con descuentos altos operan a pérdida.",

        businessQuestions: [
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
                  src="/images/JRG.jpeg"
                  alt="José Rodríguez García"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4 tracking-wide">
              José Rodríguez
            </h1>

            <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mb-8"></div>

            <p className="text-2xl md:text-3xl text-gray-600 mb-12 font-light">
              Data Analyst | BI Developer
            </p>

            {/* BARRA DE CONTACTO HÍBRIDA */}
            <div className="flex flex-wrap justify-center gap-4 items-center">
              {/* BOTÓN: WHATSAPP (Móvil - Logotipo Real) */}
              <div className="relative flex items-center group">
                <button
                  onClick={() =>
                    copyToClipboard("+52 55 1234 5678", setCopiedWhatsapp)
                  }
                  className={`w-14 h-14 rounded-full flex items-center justify-start px-4 transition-all duration-300 shadow-md overflow-hidden ${
                    copiedWhatsapp
                      ? "bg-[#25D366] w-52"
                      : "bg-yellow-400 hover:bg-[#25D366] hover:w-64"
                  }`}
                >
                  {/* Logotipo Oficial de WhatsApp en SVG */}
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-6 h-6 shrink-0 transition-colors ${copiedWhatsapp ? "fill-white" : "fill-gray-800 group-hover:fill-white"}`}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.554 4.189 1.604 6.008L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.632 0 12.032-5.396 12.035-12.03a11.79 11.79 0 00-3.526-8.511" />
                  </svg>

                  <span
                    className={`ml-4 font-bold whitespace-nowrap transition-opacity duration-300 ${
                      copiedWhatsapp
                        ? "opacity-100 text-white text-[10px]"
                        : "opacity-0 group-hover:opacity-100 text-white text-sm"
                    }`}
                  >
                    {copiedWhatsapp ? "¡WHATSAPP COPIADO!" : "+52 55 1234 5678"}
                  </span>
                </button>
              </div>

              {/* BOTÓN: TELÉFONO (Oficina / Alternativo) */}
              <div className="relative flex items-center group">
                <button
                  onClick={() =>
                    copyToClipboard("+52 55 8765 4321", setCopiedPhone)
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
                    {copiedPhone ? "¡NÚMERO COPIADO!" : "+52 55 8765 4321"}
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
                  href="https://linkedin.com/in/pprgarcia"
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
          <div className="bg-gray-50 rounded-[3rem] p-10 md:p-20 shadow-sm border border-gray-100">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Soy contador y ex gerente administrativo con experiencia en
              auditoría, contabilidad, administración e implementación de{" "}
              <strong>ERP's</strong> (funcional del cliente). Mi evolución hacia
              el <strong>Análisis de Datos y Business Intelligence</strong> nace
              de una convicción: los datos contables y administrativos son solo
              el punto de partida; el valor real reside en lo que podemos
              comprender analizando tendencias y predecir escenarios a partir de
              ellos.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Combino mi conocimiento administrativo-contable con habilidades
              técnicas en <strong>Python, SQL</strong> y herramientas de
              visualización para crear <strong>ventajas competitivas</strong>:
              automatización de procesos, controles internos y reportes
              gerenciales que generan valor real e impulsan decisiones
              estratégicas.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Puedo trabajar con herramientas de BI como{" "}
              <strong>Looker Studio, Tableau y Power BI</strong> para crear
              dashboards intuitivos, pero cuando la confidencialidad es
              prioritaria, desarrollo dashboards y soluciones personalizadas con{" "}
              <strong>Python</strong> (lenguaje más usado en ciencia de datos) y{" "}
              <strong>Javascript (React)</strong> que garantizan control total
              sobre seguridad y acceso a los datos.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Como profesional certificado en{" "}
              <strong>Advanced Data Analytics por Google</strong>, mi enfoque no
              se limita a la descripción de eventos pasados. Aplico rigurosidad
              estadística mediante{" "}
              <strong>
                Análisis de Regresión y Modelos de Machine Learning
                (Scikit-Learn)
              </strong>{" "}
              para reducir la incertidumbre operativa. No solo presento qué
              sucedió, sino que utilizo la ciencia de datos para descubrir el
              porqué y el qué sigue, identificando patrones ocultos en variables
              complejas como la <strong>rotación de personal</strong>, costo de
              conseguir un cliente, o el riesgo crediticio.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Mi diferenciador no es solo analizar la información, sino
              construir los ecosistemas que la gestionan. Un ejemplo de esto es{" "}
              <strong>RepoDeclara</strong>, un sistema repositorio fiscal y
              legal que desarrollé utilizando <strong>Next.js y Prisma</strong>,
              diseñado como herramienta para resolver problemas reales de
              trazabilidad fiscal y salvaguarda de información que enfrentan las
              empresas hoy, y que los{" "}
              <strong>ERP’s de diseño extranjero</strong> suelen ignorar, por no
              estar familiarizados con la rigurosidad y complejidad fiscal en
              México.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Si tengo la capacidad de arquitectar una plataforma de esta
              naturaleza y magnitud (RepoDeclara), ten seguridad que puedo
              desarrollar{" "}
              <strong>interfaces de recolección de datos a medida</strong>,
              desde sistemas de registro hasta herramientas de encuestas, para
              capturar las observaciones precisas que el problema de negocio
              identificado requiere, garantizando el{" "}
              <strong>control total sobre la calidad del dato</strong> desde el
              momento de su captura.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed font-medium border-t border-gray-200 pt-8 italic">
              Mi objetivo es crear <strong>puentes tecnológicos</strong> donde
              la <strong>carga administrativa y fiscal</strong>, la precisión de
              la <strong>estadística predictiva</strong> y la eficiencia del{" "}
              <strong>desarrollo web</strong> converjan para generar verdaderas
              ventajas competitivas.
            </p>
          </div>

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
          <div className="mt-12 bg-white p-8 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Certificaciones
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center space-x-3 mb-3 md:mb-0">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 leading-tight">
                    <strong className="block text-gray-900">
                      Google Advanced Data Analytics Professional Certificate
                    </strong>
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                      Coursera | Google Professional Certificates
                    </span>
                  </span>
                </div>

                {/* BOTÓN DE VERIFICACIÓN */}
                <a
                  href="https://coursera.org/verify/professional-cert/PP26T9DQKCND"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm group-hover:border-blue-600"
                >
                  Verificación de Certificado
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-gray-600 ml-5">
                Incluye: Python (Pandas, Numpy), Visualizaciones, Regresión,
                Machine Learning.
              </p>
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
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Dashboards y análisis que demuestran mi capacidad para convertir
            datos en valor empresarial
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
                    <div className="mb-4 space-y-2">
                      {project.metrics.map((metric, imt) => (
                        <div
                          key={imt}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                          {metric}
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
                      Ver proyecto completo{" "}
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
            con un enfoque disruptivo: el desarrollo de{" "}
            <span className="text-yellow-400 font-bold">
              soluciones web a medida
            </span>{" "}
            para el sector contable-administrativo.
            <br />
            <br />
            Construyo herramientas inteligentes que no solo visualizan, sino que{" "}
            <span className="underline decoration-yellow-400 decoration-2 underline-offset-4 font-semibold text-white">
              auditan y automatizan
            </span>{" "}
            tu flujo de información real. Hablemos sobre cómo modernizar o
            complementar, lo que no puede hacer tu{" "}
            <span className="text-white font-bold italic tracking-wider">
              ERP,
            </span>{" "}
            con tecnología propia.
          </p>

          {/* GRUPO DE ICONOS UNIFICADOS */}
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {/* WHATSAPP - Híbrido (Copia) */}
            <div className="relative flex items-center group">
              <button
                onClick={() =>
                  copyToClipboard("+52 55 1234 5678", setCopiedWhatsapp)
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
                      ? "opacity-100 text-white text-[10px]"
                      : "opacity-0 group-hover:opacity-100 text-white text-sm"
                  }`}
                >
                  {copiedWhatsapp ? "¡WHATSAPP COPIADO!" : "+52 55 1234 5678"}
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
                href="https://linkedin.com/in/pprgarcia"
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
