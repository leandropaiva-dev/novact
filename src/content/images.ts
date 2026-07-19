/**
 * Imagens da home (auto-hospedadas em /public/images para fiabilidade em rede
 * fraca). blurDataURL gerado a partir de miniatura 12–16px. Fonte: Unsplash
 * (licença livre). Substituir por fotografia própria do território quando existir.
 */
export const images = {
  quemSomos: {
    src: "/images/douro-quem-somos.jpg",
    width: 1400,
    height: 1050,
    alt: "Socalcos de vinha no Vale do Douro, Norte de Portugal.",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wCEAAYHBwkLCQwNDQwQERAREBgWFBQWGCMZGxkbGSM1ISchISchNS85LysvOS9UQjs7QlRhUk5SYXZpaXaUjZTBwf8BBgcHCQsJDA0NDBAREBEQGBYUFBYYIxkbGRsZIzUhJyEhJyE1LzkvKy85L1RCOztCVGFSTlJhdmlpdpSNlMHB///AABEIAAwAEAMBIgACEQEDEQH/xABfAAEBAAAAAAAAAAAAAAAAAAAFBhAAAQMCBwEAAAAAAAAAAAAAAQIDEQAEBRITITFBcRQBAQEAAAAAAAAAAAAAAAAAAAMFEQACAgMAAAAAAAAAAAAAAAABAgARAwQT/9oADAMBAAIRAxEAPwBjHrdDYQWCpvMnMuOADx5UT8iHjOusjtRVEzT+HXr906tLiuidvKnbYarqp2yIkRUjLst0VbJuGGVSLWf/2Q==",
  },
  saudeMental: {
    src: "/images/saude-mental.jpg",
    width: 1100,
    height: 1350,
    alt: "Mãos de uma pessoa idosa e de uma pessoa mais nova, pousadas em conjunto — proximidade e cuidado.",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wCEAAYHBwkLCQwNDQwQERAREBgWFBQWGCMZGxkbGSM1ISchISchNS85LysvOS9UQjs7QlRhUk5SYXZpaXaUjZTBwf8BBgcHCQsJDA0NDBAREBEQGBYUFBYYIxkbGRsZIzUhJyEhJyE1LzkvKy85L1RCOztCVGFSTlJhdmlpdpSNlMHB///AABEIAA8ADAMBIgACEQEDEQH/xABeAAEBAQAAAAAAAAAAAAAAAAAHBggQAAICAgMAAwAAAAAAAAAAAAECAxEABAUGEhMiMQEBAQAAAAAAAAAAAAAAAAAABAURAQEAAgMAAAAAAAAAAAAAAAECAAMRIYH/2gAMAwEAAhEDEQA/AGOfc41x6AZWoE0P2sm/CuiGOnHmrU2MzDxHYdqd0SWb1bAH5AXWjj7r9U5KBAsOzC6H7AstVeGqVewyjLrmTin3P//Z",
  },
} as const;
