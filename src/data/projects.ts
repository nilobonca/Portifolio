export interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  imageUrl: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: "dashboard-financeiro",
    title: "Dashboard Financeiro",
    description: "Uma plataforma completa para gestão financeira pessoal com gráficos interativos e design focado na experiência do usuário.",
    content: `
# Dashboard Financeiro

Uma aplicação voltada para o controle completo de finanças pessoais, projetada para ser simples, elegante e extremamente rápida.

## 🚀 Tecnologias Utilizadas
- **Next.js** (App Router)
- **TypeScript**
- **Chart.js** para visualização de dados
- **Vanilla CSS** para um design system super customizado e limpo

## 🎯 O Problema
Muitas pessoas têm dificuldade em entender para onde o seu dinheiro está indo, pois os aplicativos tradicionais são complexos ou poluídos visualmente.

## 💡 A Solução
Criamos um dashboard minimalista focado puramente nos dados que importam:
1. Resumo de Receitas vs Despesas
2. Gráficos de tendências mensais
3. Categorização inteligente com ícones fáceis de identificar

## 📸 Aprendizados
Durante o desenvolvimento, otimizar o carregamento dos gráficos (fazendo o uso de *lazy loading*) foi o maior desafio técnico, resolvido através dos recursos nativos do Next.js.
    `,
    tags: ["Next.js", "TypeScript", "Chart.js"],
    imageUrl: "/project1.png",
    link: "https://github.com"
  },
  {
    id: "app-de-analytics",
    title: "App de Analytics",
    description: "Aplicativo focado em análise de dados para startups, oferecendo métricas em tempo real e relatórios customizáveis.",
    content: `
# App de Analytics para Startups

Este projeto nasceu da necessidade de startups em early-stage de terem acesso rápido a métricas chave (KPIs) diretamente do celular.

## 📱 Tecnologias
- **React Native** para construção multiplataforma (iOS e Android)
- **Node.js** no backend para agilizar as consultas pesadas
- **PostgreSQL** como banco de dados principal

## 🔍 Funcionalidades Principais
- Integração em tempo real usando **WebSockets**.
- Sistema de notificações Push para avisos de quedas ou picos em métricas.
- Relatórios em PDF gerados sob demanda.

> *"Os dados não precisam ser chatos de visualizar. Eles devem contar a história da sua empresa."*
    `,
    tags: ["React Native", "Node.js", "PostgreSQL"],
    imageUrl: "/project2.png",
    link: "https://github.com"
  }
];
