import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-2">Dashboard</CardTitle>
          <CardDescription className="text-md">Bem-vindo ao seu dashboard de videochamadas.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <p className="text-md mb-8 text-muted-foreground">
            Aqui você poderá gerenciar suas reuniões e iniciar novas chamadas.
          </p>
          <Link href="/" passHref>
            <Button variant="outline" size="lg" className="w-full">Voltar para a Página Inicial</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}