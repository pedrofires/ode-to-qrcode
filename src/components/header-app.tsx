const HeaderApp = ({ input, setInput }: { input: string; setInput: (e: any) => void }) => {
  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <h1 className="text-3xl italic py-8 w-full text-center bg-zinc-800 text-white">Ode to QrCode</h1>
      <span className="mt-12 mb-4">Seja bem vindo ao ode to QrCode</span>
      <textarea
        rows={4}
        className="bg-zinc-100 w-[95%] mb-8 p-4 rounded-md"
        placeholder="Cole um link ou vários separados por vírgula"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default HeaderApp;
