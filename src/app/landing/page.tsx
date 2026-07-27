import {
  Brain,
  Bell,
  ShieldCheck,
  LineChart,
  BarChart3,
  Cpu,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { ReactNode } from "react";

type CardProps = {
  icon: ReactNode;
  title: string;
  text: string;
};

type BenefitProps = {
  text: string;
};

type StepProps = {
  number: string;
  title: string;
  text: string;
};


export default function Landing() {
  return (
    <div className="bg-[#050816] text-white">

      {/* HERO */}
      <section className="min-h-screen flex items-center">

        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16">

          <div className="flex flex-col justify-center">

            <span className="text-blue-500 font-semibold mb-4">
              SMART MONEY + IA
            </span>

            <h1 className="text-6xl font-extrabold leading-tight">

              Opera con la potencia de la Inteligencia Artificial

            </h1>

            <p className="text-gray-400 mt-8 text-xl leading-8">

              Analiza los mercados utilizando Smart Money Concepts,
              automatización e Inteligencia Artificial para detectar
              oportunidades de trading en segundos.

            </p>

            <div className="flex gap-5 mt-10">

              <button className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-xl font-semibold">

                Comenzar

              </button>

              <button className="border border-blue-500 px-8 py-4 rounded-xl hover:bg-blue-900/30 transition">

                Ver Demo

              </button>

            </div>

          </div>

          <div className="flex justify-center items-center">

            <img
              src="/hero.png"
              alt="Dashboard"
              className="rounded-3xl shadow-2xl border border-blue-500/20"
            />

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-8">

          <h2 className="text-5xl font-bold text-center">

            Funcionalidades

          </h2>

          <p className="text-center text-gray-400 mt-5 mb-16">

            Todo lo que necesitas para mejorar tu análisis.

          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <Card
              icon={<Brain size={40} />}
              title="IA Inteligente"
              text="Analiza automáticamente el mercado y encuentra oportunidades."
            />

            <Card
              icon={<LineChart size={40} />}
              title="Smart Money Concepts"
              text="Order Blocks, BOS, CHOCH, Liquidez y Fair Value Gaps."
            />

            <Card
              icon={<Bell size={40} />}
              title="Alertas"
              text="Recibe notificaciones cuando aparezcan nuevas oportunidades."
            />

            <Card
              icon={<Cpu size={40} />}
              title="Automatización"
              text="Reduce horas de análisis manual."
            />

            <Card
              icon={<BarChart3 size={40} />}
              title="Dashboard"
              text="Toda la información organizada en un mismo lugar."
            />

            <Card
              icon={<ShieldCheck size={40} />}
              title="Seguridad"
              text="Protección de datos y acceso seguro."
            />

          </div>

        </div>

      </section>

      {/* BENEFICIOS */}

      <section className="bg-[#0B1120] py-24">

        <div className="max-w-7xl mx-auto px-8">

          <h2 className="text-center text-5xl font-bold">

            Beneficios

          </h2>

          <div className="grid lg:grid-cols-2 gap-12 mt-16">

            <Benefit text="Ahorra tiempo analizando gráficos." />

            <Benefit text="Identificación automática de estructuras SMC." />

            <Benefit text="Mayor rapidez para encontrar oportunidades." />

            <Benefit text="Interfaz moderna e intuitiva." />

            <Benefit text="Alertas en tiempo real." />

            <Benefit text="Compatible con múltiples mercados." />

          </div>

        </div>

      </section>

      {/* HOW */}

      <section className="py-24">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-center text-5xl font-bold">

            ¿Cómo funciona?

          </h2>

          <div className="grid md:grid-cols-3 gap-12 mt-20">

            <Step
              number="01"
              title="Regístrate"
              text="Crea tu cuenta en menos de un minuto."
            />

            <Step
              number="02"
              title="Selecciona el mercado"
              text="Forex, Criptomonedas, Índices o Acciones."
            />

            <Step
              number="03"
              title="Recibe análisis"
              text="La IA detecta oportunidades automáticamente."
            />

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-24">

        <div className="max-w-5xl mx-auto">

          <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-blue-500 p-16 text-center">

            <h2 className="text-5xl font-bold">

              Lleva tu Trading al siguiente nivel

            </h2>

            <p className="mt-8 text-xl">

              Empieza hoy mismo y aprovecha el análisis impulsado por IA.

            </p>

            <button className="mt-10 bg-white text-blue-700 px-10 py-4 rounded-xl font-bold flex items-center gap-3 mx-auto">

              Crear Cuenta

              <ArrowRight />

            </button>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-gray-800 py-10">

        <div className="max-w-7xl mx-auto px-8 flex justify-between">

          <h2 className="text-2xl font-bold text-blue-500">

            SMC AI

          </h2>

          <span className="text-gray-500">

            © 2026 Todos los derechos reservados.

          </span>

        </div>

      </footer>

    </div>
  );
}

function Card({ icon, title, text }: CardProps) {
  return (
    <div className="bg-[#101827] rounded-2xl p-8 hover:scale-105 transition border border-blue-500/20">

      <div className="text-blue-500 mb-6">

        {icon}

      </div>

      <h3 className="text-2xl font-bold">

        {title}

      </h3>

      <p className="text-gray-400 mt-4">

        {text}

      </p>

    </div>
  );
}

function Benefit({ text }: BenefitProps) {
  return (
    <div className="flex items-center gap-4">

      <CheckCircle className="text-blue-500"/>

      <span className="text-xl">

        {text}

      </span>

    </div>
  );
}

function Step({ number, title, text }: StepProps) {
  return (
    <div className="bg-[#101827] rounded-2xl p-10 text-center border border-blue-500/20">

      <div className="text-5xl font-bold text-blue-500">

        {number}

      </div>

      <h3 className="text-2xl font-bold mt-6">

        {title}

      </h3>

      <p className="text-gray-400 mt-4">

        {text}

      </p>

    </div>
  );
}
