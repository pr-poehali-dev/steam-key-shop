import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface GameKey {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  platform: string;
  genre: string[];
  rating: number;
  inStock: boolean;
}

const gameKeys: GameKey[] = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    image: "/img/b0bc0aaa-3251-4237-8976-58f8a90bec14.jpg",
    platform: "Steam",
    genre: ["Экшен", "RPG"],
    rating: 4.2,
    inStock: true
  },
  {
    id: 2,
    title: "Elden Ring",
    price: 2499,
    image: "/img/32e8eac8-6fe4-4a93-98ca-2975e4962f02.jpg",
    platform: "Steam",
    genre: ["RPG", "Фэнтези"],
    rating: 4.8,
    inStock: true
  },
  {
    id: 3,
    title: "Call of Duty: Modern Warfare III",
    price: 3599,
    originalPrice: 4299,
    discount: 16,
    image: "/placeholder.svg",
    platform: "Steam",
    genre: ["Шутер", "Мультиплеер"],
    rating: 4.1,
    inStock: true
  },
  {
    id: 4,
    title: "FIFA 24",
    price: 2299,
    image: "/placeholder.svg",
    platform: "Steam", 
    genre: ["Спорт", "Симулятор"],
    rating: 4.3,
    inStock: false
  }
];

const Index = () => {
  const [cart, setCart] = useState<GameKey[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (game: GameKey) => {
    setCart(prev => [...prev, game]);
  };

  const removeFromCart = (gameId: number) => {
    setCart(prev => prev.filter(game => game.id !== gameId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, game) => total + game.price, 0);
  };

  const filteredGames = gameKeys.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gaming-dark">
      {/* Header */}
      <header className="bg-gaming-navy/50 backdrop-blur-sm border-b border-gaming-navy">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Icon name="Gamepad2" className="text-gaming-pink" size={32} />
              <h1 className="text-2xl font-montserrat font-bold text-gaming-white">
                Steam Keys Store
              </h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gaming-white hover:text-gaming-pink transition-colors">Главная</a>
              <a href="#catalog" className="text-gaming-white hover:text-gaming-pink transition-colors">Каталог</a>
              <a href="#legal" className="text-gaming-white hover:text-gaming-pink transition-colors">Документы</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="relative bg-gaming-navy hover:bg-gaming-pink border-gaming-pink text-gaming-white">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-gaming-pink text-gaming-white">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gaming-navy text-gaming-white border-gaming-pink">
                  <DialogHeader>
                    <DialogTitle className="font-montserrat">Корзина</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-center text-gray-400">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map((game, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gaming-dark rounded">
                            <span>{game.title}</span>
                            <div className="flex items-center space-x-2">
                              <span className="font-montserrat font-bold text-gaming-pink">
                                {game.price} ₽
                              </span>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => removeFromCart(game.id)}
                              >
                                <Icon name="X" size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Separator className="bg-gaming-pink" />
                        <div className="flex justify-between items-center">
                          <span className="font-montserrat font-bold text-lg">Итого:</span>
                          <span className="font-montserrat font-bold text-xl text-gaming-pink">
                            {getTotalPrice()} ₽
                          </span>
                        </div>
                        <Button className="w-full bg-gaming-pink hover:bg-gaming-pink/90 text-white">
                          Оформить заказ
                        </Button>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-gaming-navy to-gaming-dark-blue">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('/img/4ba6b31f-8059-40c9-be71-956ddfed233f.jpg')` }}
        ></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-montserrat font-bold text-gaming-white mb-6 animate-fade-in">
              Лучшие игры по лучшим ценам
            </h2>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in">
              Покупайте Steam ключи быстро, безопасно и выгодно. Мгновенная доставка на email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative flex-1 max-w-md">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Найти игру..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gaming-navy/80 border-gaming-pink text-gaming-white placeholder-gray-400"
                />
              </div>
              <Button className="bg-gaming-pink hover:bg-gaming-pink/90 text-white px-8 py-3 animate-glow">
                Найти игру
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Games Catalog */}
      <section id="catalog" className="py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-montserrat font-bold text-center text-gaming-white mb-12">
            Популярные игры
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <Card key={game.id} className="bg-gaming-navy/80 border-gaming-pink/30 hover:border-gaming-pink transition-all duration-300 hover:scale-105 animate-fade-in">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img 
                      src={game.image} 
                      alt={game.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {game.discount && (
                      <Badge className="absolute top-2 right-2 bg-gaming-pink text-white">
                        -{game.discount}%
                      </Badge>
                    )}
                    {!game.inStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-t-lg">
                        <Badge variant="destructive" className="text-lg">
                          Нет в наличии
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Steam" fallback="Gamepad2" className="text-gaming-white" size={16} />
                    <span className="text-sm text-gray-400">{game.platform}</span>
                    <div className="flex items-center ml-auto">
                      <Icon name="Star" className="text-gaming-orange fill-current" size={16} />
                      <span className="text-sm text-gray-400 ml-1">{game.rating}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-montserrat font-semibold text-gaming-white mb-2">
                    {game.title}
                  </h4>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {game.genre.map((g, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-gaming-dark-blue text-gray-300">
                        {g}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-montserrat font-bold text-gaming-pink">
                        {game.price} ₽
                      </span>
                      {game.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {game.originalPrice} ₽
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      size="sm" 
                      disabled={!game.inStock}
                      onClick={() => addToCart(game)}
                      className="bg-gaming-pink hover:bg-gaming-pink/90 text-white"
                    >
                      <Icon name="ShoppingCart" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Documents */}
      <section id="legal" className="py-16 bg-gaming-navy/20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-montserrat font-bold text-center text-gaming-white mb-12">
            Правовые документы
          </h3>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="privacy" className="bg-gaming-navy/50 rounded-lg border border-gaming-pink/30">
                <AccordionTrigger className="px-6 text-gaming-white hover:text-gaming-pink font-montserrat">
                  <div className="flex items-center gap-3">
                    <Icon name="Shield" className="text-gaming-pink" size={24} />
                    Политика конфиденциальности
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-gray-300">
                  <p className="mb-4">Настоящая политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей нашего сервиса.</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Мы собираем только необходимую информацию для обработки заказов</li>
                    <li>Ваши данные надежно защищены и не передаются третьим лицам</li>
                    <li>Используем шифрование для защиты платежной информации</li>
                    <li>Вы можете запросить удаление своих данных в любое время</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="terms" className="bg-gaming-navy/50 rounded-lg border border-gaming-pink/30">
                <AccordionTrigger className="px-6 text-gaming-white hover:text-gaming-pink font-montserrat">
                  <div className="flex items-center gap-3">
                    <Icon name="FileText" className="text-gaming-pink" size={24} />
                    Пользовательское соглашение
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-gray-300">
                  <p className="mb-4">Используя наш сервис, вы соглашаетесь с следующими условиями:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Все ключи являются официальными и лицензионными</li>
                    <li>Активация ключей происходит только на указанной платформе</li>
                    <li>Запрещено использование сервиса в мошеннических целях</li>
                    <li>Мы оставляем за собой право отказать в обслуживании</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="refund" className="bg-gaming-navy/50 rounded-lg border border-gaming-pink/30">
                <AccordionTrigger className="px-6 text-gaming-white hover:text-gaming-pink font-montserrat">
                  <div className="flex items-center gap-3">
                    <Icon name="RefreshCw" className="text-gaming-pink" size={24} />
                    Политика возврата
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-gray-300">
                  <p className="mb-4">Условия возврата и обмена цифровых товаров:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Возврат возможен в течение 24 часов с момента покупки</li>
                    <li>Ключ не должен быть активирован для возврата</li>
                    <li>Возврат денежных средств происходит в течение 3-7 рабочих дней</li>
                    <li>При технических проблемах гарантируем замену ключа</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gaming-navy py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Gamepad2" className="text-gaming-pink" size={24} />
                <span className="font-montserrat font-bold text-gaming-white">Steam Keys Store</span>
              </div>
              <p className="text-gray-400">
                Лучший магазин игровых ключей с мгновенной доставкой и гарантией качества.
              </p>
            </div>
            
            <div>
              <h4 className="font-montserrat font-semibold text-gaming-white mb-4">Платформы</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-gaming-pink transition-colors">Steam</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gaming-pink transition-colors">Epic Games</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gaming-pink transition-colors">Origin</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-montserrat font-semibold text-gaming-white mb-4"></h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-gaming-pink transition-colors"></a></li>
                <li><a href="#" className="text-gray-400 hover:text-gaming-pink transition-colors"></a></li>
                <li><a href="#" className="text-gray-400 hover:text-gaming-pink transition-colors"></a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-montserrat font-semibold text-gaming-white mb-4"></h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-gaming-pink transition-colors"></a></li>
                <li><a href="#" className="text-gray-400 hover:text-gaming-pink transition-colors">email поддержки: support@steamkeys.ru</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gaming-pink transition-colors"></a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-gaming-pink/30" />
          
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Steam Keys Store. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;