import React from 'react';

function Header() {
  return (
    <header className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image without parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(/lccbg.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
      </div>

      {/* Text content */}
      <div className="relative z-10 text-center text-white px-4 animate-fade-in">
        <h1 className="text-5xl font-bold mb-6 tracking-wide animate-slide-down">
          Scholarships
        </h1>
        <p className="max-w-3xl mx-auto text-xl leading-relaxed font-light animate-slide-up">
          As a Catholic educational institution, La Consolacion College Bacolod upholds
          the value of compassion and provides every available educational opportunity to
          poor but deserving students.
        </p>
      </div>
    </header>
  );
}

export default Header;
