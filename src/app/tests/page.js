"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Limpa erros anteriores

    try {
      // Tenta fazer o login usando o método de email e senha
      const result = await authClient.signIn.email({ email, password });

      if (result.error) {
        // Se a API retornar um erro (ex: senha incorreta), exibe a mensagem
        setError(result.error.message);
      } else {
        // Se o login for bem-sucedido, redireciona para o dashboard
        router.push("/dashboard");
      }
    } catch (err) {
      // Captura erros de rede ou outros problemas inesperados
      setError("Ocorreu um erro inesperado. Tente novamente.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}