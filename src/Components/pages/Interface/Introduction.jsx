import React from 'react';




export function Introduction () {
  return (
    <>
    
      <section className="min-h-screen flex items-center bg-black text-white px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <button className="border px-4 py-1 rounded-full border-white text-white mb-4 hover:shadow-lg transition-all">
            <span role="img" aria-label="intro">⚙</span> INTRODUCTION
          </button>
          <h1 className="text-5xl font-bold mb-4">WELCOME TO DEVOXS</h1>
          <p className="text-gray-300 mb-6">
            <strong>Innovate. Scale. Deliver.</strong><br /><br />
            At <strong>DEVOXS</strong>, we redefine what's possible through cutting-edge <strong>Cloud Services</strong> and tailor-made <strong>Software Solutions</strong>.<br />
            Our mission is simple — to empower businesses to <strong>move faster</strong>, <strong>work smarter</strong>, and <strong>grow stronger</strong> by merging deep industry expertise with next-gen technology.<br /><br />
            From ambitious startups to established enterprises, DEVOXS is your trusted partner in digital transformation — delivering solutions that <strong>adapt, scale, and drive value</strong>.
          </p>

          <h2 className="text-2xl font-semibold mb-2 mt-8">💻 SOFTWARE SERVICES</h2>
          <ul className="list-disc list-inside text-gray-300 mb-6">
            <li><strong>Custom Software Development:</strong> Purpose-built software crafted from the ground up — scalable, secure, and aligned perfectly with your unique business objectives.</li>
            <li><strong>Web & Mobile Application Development:</strong> Engaging, responsive, and high-performance applications that boost user satisfaction and enhance your brand presence across devices.</li>
            <li><strong>API Integration & Development:</strong> Unlock new possibilities by seamlessly connecting platforms, systems, and data through powerful APIs.</li>
            <li><strong>Software Maintenance & Support:</strong> Keep your systems optimized and future-ready with proactive maintenance, upgrades, and reliable technical support.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-2">☁ CLOUD SERVICES</h2>
          <ul className="list-disc list-inside text-gray-300 mb-6">
            <li><strong>Cloud Consulting & Strategy:</strong> We align your goals with the right cloud technologies — AWS, Azure, or GCP — to future-proof your digital ecosystem.</li>
            <li><strong>Cloud Migration:</strong> Hassle-free and secure migration of your apps, data, and infrastructure from legacy systems to modern cloud environments.</li>
            <li><strong>DevOps & Automation:</strong> Accelerate innovation with CI/CD pipelines, containerization, and infrastructure automation that reduce time-to-market.</li>
            <li><strong>Cloud Management & Optimization:</strong> Maximize performance, cut unnecessary costs, and ensure high availability with intelligent cloud monitoring and tuning.</li>
          </ul>

          
        </div>
      </section>
      <hr className="w-full h-[5px] border-none bg-gradient-to-r from-blue-500 via-white to-blue-500 bg-[length:100%_100%] animate-colorChange "/>
    </>
  );
};

export default Introduction;
