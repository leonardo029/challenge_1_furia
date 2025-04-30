import ChatButton from './components/ChatButton';
import logoFuria from '/assets/images/logoFuria.svg';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Logo do canto superior direito */}
      <div className="fixed z-50 pl-6 pt-4 pb-4" style={{ backgroundColor:`white`, width: '100%' }}>
        <img src={logoFuria} alt="Logo FURIA" className="w-18" />
      </div>

      {/* Conteúdo principal */}
      <main className="relative h-screen flex items-center justify-center">
        {/* Imagem de fundo com sobreposição */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/55 to-black/85"></div>
        </div>

        <div className="text-center z-10">
            <h1 className="md:text-7xl font-bold mb-4">
              <span className="furia-letra-branca-borda-preta">FURIA </span>
              <span className="furia-letra-preta-borda-branca">CS</span>
            </h1>
          <p className="md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The pride of Brazil. The fury of competition.
          </p>
        </div>
      </main>
      <ChatButton />
    </div>
  );
}

export default App;