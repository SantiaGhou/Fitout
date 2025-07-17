import React, { useEffect, useState } from 'react';

export function Carousel() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const element = document.getElementById('logo-carousel');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const companies = [
    {
      name: 'OpenAI',
      logo: 'https://img.icons8.com/?size=100&id=FBO05Dys9QCg&format=png&color=FFFFFF',
    },
    {
      name: 'TypeScript',
      logo: 'https://www.svgrepo.com/show/459084/logo-ts.svg',
    },
    {
      name: 'Node.js',
      logo: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg',
    },
    {
      name: 'Vercel',
      logo: 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/vercel.png',
    },
    {
      name: 'Next.js',
      logo: 'https://cdn.brandfetch.io/id2alue-rx/w/394/h/80/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B',
    },
    {
      name: 'Python',
      logo: 'https://cdn.worldvectorlogo.com/logos/python-5.svg',
    },
  ];

  const [errorLogos, setErrorLogos] = useState<{ [key: number]: boolean }>({});

  const handleImgError = (index: number) => {
    setErrorLogos((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section
      id="logo-carousel"
      className="py-16 bg-[#111012] border-t border-gray-800"
    >
      <div className="container mx-auto px-6">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h3 className="text-center text-gray-400 text-lg mb-12 font-medium">
            Tecnologias que impulsionam nossa plataforma
          </h3>

          <div className="relative overflow-hidden">
            <div className="flex space-x-16 w-[200%] items-center animate-scroll">
              {[...companies, ...companies].map((company, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-32 h-16 flex items-center justify-center transform hover:scale-110 transition-all duration-300 hover:opacity-100 opacity-60 group"
                >
                  {!errorLogos[index] ? (
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="max-w-full max-h-full object-contain filter brightness-0 invert group-hover:filter-none transition-all duration-300"
                      onError={() => handleImgError(index)}
                    />
                  ) : (
                    <span className="text-white font-bold text-lg">
                      {company.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
