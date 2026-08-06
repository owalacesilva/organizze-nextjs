const ptBR = {
	common: {
		add: "Adicionar",
		all: "Todas",
		apply: "Aplicar",
		cancel: "Cancelar",
		clear: "Limpar",
		clearAll: "Limpar tudo",
		close: "Fechar",
		confirm: "Confirmar",
		delete: "Excluir",
		edit: "Editar",
		error: "Erro",
		loading: "Carregando...",
		none: "Nenhum",
		refresh: "Atualizar",
		refreshing: "Atualizando...",
		retry: "Tentar novamente",
		save: "Salvar",
		saving: "Salvando...",
		search: "Buscar",
		searchPlaceholder: "Buscar aqui...",
		select: "Selecionar",
	},

	nav: {
		dashboard: "Painel",
		transactions: "Movimentações",
		wallets: "Carteiras",
		budgets: "Orçamentos",
		goals: "Metas",
		profile: "Perfil",
		analytics: "Análises",
		support: "Suporte",
		referrals: "Indicações",
		settings: "Configurações",
	},

	layout: {
		home: "Início",
		collapseSidebar: "Recolher menu",
		expandSidebar: "Expandir menu",
		toggleSidebar: "Alternar menu lateral",
		language: "Idioma",
		changeLanguage: "Alterar idioma",
		copyright: "© Copyright {{brand}} | Todos os direitos reservados",
	},

	pagination: {
		rowsPerPage: "Linhas por página",
		showing: "Mostrando {{from}}–{{to}} de {{total}}",
		empty: "Nenhum registro",
		page: "Página {{page}} de {{pages}}",
		goToPage: "Ir para a página {{page}}",
		first: "Primeira página",
		previous: "Página anterior",
		next: "Próxima página",
		last: "Última página",
	},

	filters: {
		title: "Filtros",
		show: "Mostrar filtros",
		hide: "Ocultar filtros",
		active: "{{count}} ativo",
		active_plural: "{{count}} ativos",
		clear: "Limpar filtros",
	},

	transactions: {
		title: "Movimentações",
		subtitle: "Acompanhe e gerencie suas movimentações financeiras",
		add: "Nova movimentação",
		edit: "Editar movimentação",
		details: "Detalhes da movimentação",
		empty: "Nenhuma movimentação encontrada",
		emptyFiltered: "Nenhuma movimentação corresponde aos filtros aplicados",
		loadError: "Não foi possível carregar as movimentações",
		saveError: "Não foi possível salvar a movimentação",
		deleteError: "Não foi possível excluir a movimentação",
		created: "Movimentação criada",
		updated: "Movimentação atualizada",
		deleted: "Movimentação excluída",
		deleteConfirmTitle: "Excluir movimentação?",
		deleteConfirmDescription:
			"Esta ação não pode ser desfeita. A movimentação “{{description}}” será removida permanentemente.",

		fields: {
			amount: "Valor",
			category: "Categoria",
			date: "Data",
			description: "Descrição",
			id: "ID",
			type: "Tipo",
			wallet: "Carteira",
			actions: "Ações",
		},

		placeholders: {
			search: "Buscar por descrição ou categoria...",
			amount: "0,00",
			description: "Descreva a movimentação...",
			selectCategory: "Selecione uma categoria",
			selectWallet: "Selecione uma carteira",
			selectType: "Selecione o tipo",
		},

		types: {
			all: "Todos",
			income: "Receita",
			expense: "Despesa",
		},

		periods: {
			label: "Período",
			all: "Todo o período",
			week: "Últimos 7 dias",
			month: "Últimos 30 dias",
			quarter: "Últimos 90 dias",
			year: "Últimos 12 meses",
		},

		amountRange: {
			min: "Valor mínimo",
			max: "Valor máximo",
		},

		summary: {
			income: "Receitas",
			expenses: "Despesas",
			balance: "Saldo",
			count: "{{count}} movimentação",
			count_plural: "{{count}} movimentações",
		},

		validation: {
			amountRequired: "Informe um valor maior que zero",
			categoryRequired: "Escolha uma categoria",
			dateRequired: "Informe a data",
			descriptionRequired: "Informe a descrição",
		},
	},
};

export default ptBR;
