import '../public/styles/Navbar.css';
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-primary-color shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex flex-1 justify-start items-center space-x-6">
        </div>
        <div className="flex-1 flex justify-center items-center space-x-2">
          
          <span className="titleb">
            <Image
              src="/pdf%20reader.png"
              alt="Pdf Reader Logo"
              width={32}
              height={32}
            />
            <a href="/"></a>Pdf Reader</span>
        </div>
        <div className="flex flex-1 justify-end button-container">
          <a href="https://gauresh.vercel.app" target="_blank" rel="noopener noreferrer" className="buttons">
            Website
          </a>
          <a href="https://twitter.com/hseruag" target="_blank" rel="noopener noreferrer" className="buttons">
            Twitter
          </a>
          <a href="https://github.com/gaureshpai" target="_blank" rel="noopener noreferrer" className="buttons">
            GitHub
          </a>
          <a href="https://linkedin.com/in/gaureshpai" target='_blank' rel='noopener noreferrer' className='buttons' >
            Linkedin
          </a>
        </div>
      </div>
    </nav>
  );
}
