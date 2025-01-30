/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['i.pinimg.com'], // Adicione o domínio da imagem externa aqui
  },
};

module.exports = nextConfig;
