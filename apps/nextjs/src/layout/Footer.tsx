const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="container mx-auto flex items-center justify-between gap-2 px-6 py-3">
        <a href="#" className="text-xl font-bold text-white">
          Brand
        </a>
        <p className="py-2 text-[10px] text-slate-300 sm:py-0 sm:text-xs">
          © {new Date().getFullYear()} Escale Velocity Software Ltd. All rights
          reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
