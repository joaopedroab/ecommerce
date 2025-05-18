
import { useState } from 'react';
import { Search, ShoppingCart, Star, Filter } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  imageUrl: string;
  onSale: boolean;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Fones de Ouvido Bluetooth Sem Fio",
    description: "Fones de ouvido premium com cancelamento de ruído e 30 horas de bateria",
    price: 199.99,
    category: "Eletrônicos",
    rating: 4.7,
    imageUrl: "https://placehold.co/300x300/2a9d8f/FFFFFF?text=Fones",
    onSale: false
  },
  {
    id: 2,
    name: "Camiseta de Algodão Orgânico",
    description: "Camiseta ecologicamente correta feita com algodão de origem sustentável",
    price: 24.99,
    category: "Roupas",
    rating: 4.3,
    imageUrl: "https://placehold.co/300x300/2a9d8f/FFFFFF?text=Camiseta",
    onSale: true
  },
  {
    id: 3,
    name: "Smartwatch Série 5",
    description: "Acompanhe atividades físicas, métricas de saúde e mantenha-se conectado",
    price: 249.99,
    category: "Eletrônicos",
    rating: 4.8,
    imageUrl: "https://placehold.co/300x300/2a9d8f/FFFFFF?text=Smartwatch",
    onSale: true
  },
  {
    id: 4,
    name: "Garrafa de Água Inox",
    description: "Isolamento duplo mantém bebidas quentes ou frias por 24 horas",
    price: 34.99,
    category: "Casa",
    rating: 4.5,
    imageUrl: "https://placehold.co/300x300/2a9d8f/FFFFFF?text=Garrafa",
    onSale: false
  },
  {
    id: 5,
    name: "Coleção de Plantas para Interior",
    description: "Conjunto de 3 plantas para ambientes internos com vasos decorativos",
    price: 49.99,
    category: "Casa",
    rating: 4.2,
    imageUrl: "https://placehold.co/300x300/2a9d8f/FFFFFF?text=Plantas",
    onSale: false
  },
  {
    id: 6,
    name: "Bolsa Transversal de Couro",
    description: "Bolsa de couro genuíno artesanal com alça ajustável",
    price: 79.99,
    category: "Acessórios",
    rating: 4.6,
    imageUrl: "https://placehold.co/300x300/2a9d8f/FFFFFF?text=Bolsa",
    onSale: true
  }
];

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [cartItems, setCartItems] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState("Todos");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredProducts(mockProducts);
    } else {
      const filtered = mockProducts.filter(
        product => 
          product.name.toLowerCase().includes(term.toLowerCase()) || 
          product.description.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  const categories = ["Todos", "Eletrônicos", "Roupas", "Casa", "Acessórios", "Promoções"];
  
  const filterByCategory = (category: string) => {
    setActiveFilter(category);
    if (category === "Todos") {
      setFilteredProducts(mockProducts);
    } else if (category === "Promoções") {
      const filtered = mockProducts.filter(product => product.onSale);
      setFilteredProducts(filtered);
    } else {
      const filtered = mockProducts.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const displayStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-9 bg-white/50 backdrop-blur-sm"
          />
        </div>
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItems > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-ecommerce text-white h-5 w-5 flex items-center justify-center rounded-full p-0">
              {cartItems}
            </Badge>
          )}
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => filterByCategory(category)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
              activeFilter === category 
                ? 'bg-ecommerce text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden h-full flex flex-col">
              <div className="relative">
                <div className="w-full h-48 overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                {product.onSale && (
                  <Badge className="absolute top-2 right-2 bg-red-500">PROMOÇÃO</Badge>
                )}
              </div>
              <CardHeader className="p-4">
                <h3 className="font-medium text-lg">{product.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  {displayStars(product.rating)}
                  <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                </div>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-ecommerce">R${product.price.toFixed(2)}</span>
                  {product.onSale && (
                    <span className="text-sm text-gray-500 line-through">
                      R${(product.price * 1.2).toFixed(2)}
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full bg-ecommerce hover:bg-ecommerce/90"
                  onClick={addToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" /> Adicionar ao Carrinho
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center py-10 text-gray-500">Nenhum produto encontrado correspondente à sua busca.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
