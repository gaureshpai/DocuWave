import '../public/styles/Navbar.css';
import Image from "next/image";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-primary-color shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex flex-1 justify-start items-center space-x-6">
        </div>
        <div className="flex-1 flex justify-center items-center space-x-2 text-decoration:none;">
          <span className='titleb'>
          <Link href="/" className="titleb">
            <Image
              src="/pdf%20reader.png"
              alt="Pdf Reader Logo"
              width={32}
              height={32}
            />
            Pdf Reader
          </Link>
          </span>
        </div>
        <div className="flex flex-1 justify-end button-container">
          <Link href="https://gauresh.vercel.app" target="_blank" rel="noopener noreferrer" className="buttons">
            Website
          </Link>
          <Link href="https://twitter.com/hseruag" target="_blank" rel="noopener noreferrer" className="buttons">
            Twitter
          </Link>
          <Link href="https://github.com/gaureshpai" target="_blank" rel="noopener noreferrer" className="buttons">
            GitHub
          </Link>
          <Link href="https://linkedin.com/in/gaureshpai" target='_blank' rel='noopener noreferrer' className='buttons' >
            Linkedin
          </Link>
        </div>
      </div>
    </nav>
  );
}
