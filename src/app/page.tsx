"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Subjects } from "@/components/Subjects";
import { Pricing } from "@/components/Pricing";
import { HowItWorks } from "@/components/HowItWorks";
import { PaymentInfo } from "@/components/PaymentInfo";
import { EnrollForm } from "@/components/EnrollForm";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import type { PlanId } from "@/config/site";

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId | "">("");

  function handleSelectPlan(plan: PlanId) {
    setSelectedPlan(plan);
    document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <WhyChooseUs />
        <Subjects />
        <Pricing onSelectPlan={handleSelectPlan} />
        <HowItWorks />
        <PaymentInfo />
        <EnrollForm selectedPlan={selectedPlan} onPlanChange={setSelectedPlan} />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
