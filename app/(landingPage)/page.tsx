export const dynamic = 'force-static'; // Forces static behavior
export const revalidate = false;

import type React from "react"
import ClientScript from "./script";
import CoverSection from "./(sections)/cover-section";
import AnnouncementSection from "./(sections)/announcement-section";
import SponsorSection from "./(sections)/sponsor-section";
import FaqSection from "./(sections)/faq-section";
// import GamesSection from "./(sections)/games-section";

export default function LandingPage() {
  return (
    <>
      <ClientScript />
      <CoverSection />
      <AnnouncementSection />
      <SponsorSection />
      <FaqSection />
    </>
  )
}