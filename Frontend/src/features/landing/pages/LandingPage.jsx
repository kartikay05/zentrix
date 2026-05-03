import LandingNavbar from '../components/LandingNavbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030712] font-sans selection:bg-indigo-500/30">
      <LandingNavbar />
      
      <main>
        <HeroSection />
        
        {/* Placeholder for future sections (Features, Social Proof, etc.) */}
        <section className="py-24 border-t border-white/[0.05] bg-[#0b0f1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Trusted by modern engineering teams</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-12">
              Join thousands of developers who are sleeping soundly while Zentrix handles the pager.
            </p>
            
            {/* Simple logo cloud mockup */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
              {['Acme Corp', 'GlobalNet', 'TechFlow', 'DataSync', 'CloudScale'].map((company) => (
                <div key={company} className="text-xl font-bold text-slate-400">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
