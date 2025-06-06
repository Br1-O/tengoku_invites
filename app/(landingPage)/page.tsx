export const dynamic = 'force-static'; // Forces static behavior
export const revalidate = false;

import type React from "react"
import CoverSection from "./(sections)/cover-section";
import AnnouncementSection from "./(sections)/announcement-section";
import SponsorSection from "./(sections)/sponsor-section";
import FaqSection from "./(sections)/faq-section";
import InstructionsSection from "./(sections)/instructions-section";
// import GamesSection from "./(sections)/games-section";

export default function LandingPage() {
  return (
    <>
      <CoverSection />
      <AnnouncementSection />
      <InstructionsSection />
      <SponsorSection />
      <FaqSection />
    </>
  )
}