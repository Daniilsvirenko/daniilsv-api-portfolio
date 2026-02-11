import Hero from "@/components/Hero";
import ApiEndpoint from "@/components/ApiEndpoint";
import SkillsGrid from "@/components/SkillsGrid";
import Sidebar from "@/components/Sidebar";
import ChatWidget from "@/components/ChatWidget";
import FadeIn from "@/components/FadeIn";
import { portfolioData } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#0B0C10] selection:bg-green-500/30 overflow-x-hidden">
      <Sidebar />

      {/* FIX: Added overflow-x-hidden to main to prevent any children 
         from causing horizontal scroll on the body. 
         Changed padding to p-4 for mobile.
      */}
      <main className="md:ml-64 flex-1 pt-16 md:pt-20 p-4 md:p-10 space-y-12 md:space-y-20 max-w-5xl mx-auto w-full transition-all duration-300">

        <FadeIn>
          <Hero />
        </FadeIn>

        <section id="about" className="pt-10 md:pt-20">
          <FadeIn>
            <ApiEndpoint
              method="GET"
              path="/about"
              description="Retrieve author's biography and mission."
              response={portfolioData.about}
              defaultOpen={true}
            />
          </FadeIn>
        </section>

        <section id="experience" className="pt-10 md:pt-20">
          <FadeIn>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-green-500">/</span> experience
            </h2>
            {portfolioData.experience.map((job, i) => (
              <ApiEndpoint
                key={i}
                method="GET"
                // The ApiEndpoint component now handles the long path wrapping
                path={`/experience/${job.company.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`}
                description={`Role at ${job.company}`}
                response={job}
              />
            ))}
          </FadeIn>
        </section>

        <section id="education" className="pt-10 md:pt-20">
          <FadeIn>
            <ApiEndpoint
              method="GET"
              path="/education"
              description="Retrieve academic background."
              response={portfolioData.education}
              defaultOpen={true}
            />
          </FadeIn>
        </section>

        <section id="projects" className="pt-10 md:pt-20">
          <FadeIn>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-green-500">/</span> projects
            </h2>
            {portfolioData.projects.map((project, i) => (
              <ApiEndpoint
                key={i}
                method="GET"
                path={`/projects/${project.name.toLowerCase().replace(/\s+/g, '-')}`}
                description={project.description}
                response={project}
              />
            ))}
          </FadeIn>
        </section>

        <section id="skills" className="pt-10 md:pt-20">
          <FadeIn>
            <ApiEndpoint
              method="GET"
              path="/skills"
              description="List Technical Skills and Tools"
              response={portfolioData.skills}
              defaultOpen={true}
            />
            <SkillsGrid data={portfolioData.skills as any} />
          </FadeIn>
        </section>

        <section id="contact" className="pt-10 md:pt-20 pb-40">
          <FadeIn>
            <ApiEndpoint
              method="POST"
              path="/contact"
              description="Send a message to the author."
              response={{ status: "success", message: "Message received. I'll get back to you ASAP." }}
            />
            <div className="mt-8 p-6 border border-dashed border-slate-700 rounded-lg text-center text-slate-500 text-sm font-mono break-all">
              To contact, email <a href="mailto:danysvirenko@gmail.com" className="text-green-500 hover:underline">danysvirenko@gmail.com</a>
            </div>
          </FadeIn>
        </section>
      </main>
      <ChatWidget />
    </div>
  );
}