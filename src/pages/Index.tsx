import ProductList from "@/components/ecommerce/ProductList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

const Index = () => {
  return (
    <div className="container mx-auto py-8 px-4 bg-gradient-to-br from-green-50 to-teal-50 min-h-screen">
      <Card className="mb-6 border-ecommerce/20 bg-white/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-2 rounded-full bg-ecommerce/10">
            <ShoppingBag className="h-8 w-8 text-ecommerce" />
          </div>
          <div>
            <CardTitle className="text-2xl text-ecommerce">Loja Virtual</CardTitle>
            <CardDescription>Navegue e compre produtos de alta qualidade</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p>
            Esta aplicação de e-commerce exibe funcionalidades modernas de compras online.
            Os recursos incluem categorização de produtos, busca, integração do carrinho de compras,
            e cartões de produtos responsivos. Em um ambiente de produção, isso incluiria
            processamento de pagamentos e contas de usuário.
          </p>
        </CardContent>
      </Card>
      <ProductList />
    </div>
  );
};

export default Index;
