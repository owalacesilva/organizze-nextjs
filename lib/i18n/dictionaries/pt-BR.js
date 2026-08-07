const ptBR = {
	common: {
		actions: "Ações",
		add: "Adicionar",
		all: "Todas",
		apply: "Aplicar",
		back: "Voltar",
		cancel: "Cancelar",
		clear: "Limpar",
		clearAll: "Limpar tudo",
		close: "Fechar",
		color: "Cor",
		confirm: "Confirmar",
		copied: "Copiado para a área de transferência",
		copy: "Copiar",
		create: "Criar",
		delete: "Excluir",
		disable: "Desativar",
		edit: "Editar",
		enable: "Ativar",
		error: "Erro",
		loading: "Carregando...",
		name: "Nome",
		next: "Avançar",
		none: "Nenhum",
		notSet: "Não informado",
		optional: "opcional",
		previous: "Voltar",
		refresh: "Atualizar",
		refreshing: "Atualizando...",
		remove: "Remover",
		retry: "Tentar novamente",
		save: "Salvar",
		saving: "Salvando...",
		search: "Buscar",
		searchPlaceholder: "Buscar aqui...",
		select: "Selecionar",
		total: "Total",
		viewAll: "Ver tudo",
	},

	nav: {
		dashboard: "Painel",
		transactions: "Movimentações",
		import: "Importar",
		insights: "Insights",
		wallets: "Carteiras",
		budgets: "Orçamentos",
		goals: "Metas",
		profile: "Perfil",
		analytics: "Análises",
		categories: "Categorias",
		settings: "Configurações",
	},

	layout: {
		home: "Início",
		breadcrumb: "Trilha de navegação",
		collapseSidebar: "Recolher menu",
		expandSidebar: "Expandir menu",
		toggleSidebar: "Alternar menu lateral",
		language: "Idioma",
		changeLanguage: "Alterar idioma",
		copyright: "© Copyright {{brand}} | Todos os direitos reservados",
		theme: "Tema",
		toggleTheme: "Alternar tema",
		themeLight: "Claro",
		themeDark: "Escuro",
		themeSystem: "Sistema",
		notifications: "Notificações",
		notificationsEmpty: "Nenhuma notificação",
		markAllRead: "Marcar todas como lidas",
		myAccount: "Minha conta",
		logout: "Sair",
	},

	notifications: {
		viewAll: "Ver todas as notificações",
		minutesAgo: "há {{count}} minuto",
		minutesAgo_plural: "há {{count}} minutos",
		hoursAgo: "há {{count}} hora",
		hoursAgo_plural: "há {{count}} horas",

		samples: {
			transactionCreated: {
				title: "Movimentação registrada",
				description: "Uma nova despesa foi lançada na sua conta corrente.",
			},
			budgetExceeded: {
				title: "Limite do orçamento atingido",
				description: "O orçamento de mercado chegou a 100% neste mês.",
			},
			goalReached: {
				title: "Marco de meta",
				description: "Sua reserva de emergência passou de 40% do objetivo.",
			},
			securityAlert: {
				title: "Novo acesso",
				description: "Um novo dispositivo entrou na sua conta.",
			},
		},
	},

	auth: {
		welcome: "Boas-vindas ao {{brand}}",
		twoFactorHelp: "Problemas com a verificação em duas etapas?",
		privacyPolicy: "Política de privacidade",

		signIn: {
			title: "Entrar",
			submit: "Entrar",
			submitting: "Entrando...",
			noAccount: "Ainda não tem conta? Cadastre-se",
			forgot: "Esqueceu a senha?",
			error: "E-mail ou senha inválidos",
			mockHint: "Conta de demonstração: {{email}} / {{password}}",
		},

		signUp: {
			title: "Criar conta",
			submit: "Criar conta",
			hasAccount: "Já tem uma conta? Entrar",
			passwordMismatch: "As senhas não conferem",
		},

		reset: {
			title: "Redefinir senha",
			submit: "Enviar link de redefinição",
			remember: "Lembrou a senha? Entrar",
			sent: "Enviamos um link de redefinição para o seu e-mail",
		},

		phone: {
			title: "Verificação de telefone",
			willSend: "Vamos enviar um código de verificação para {{phone}}",
			sendOtp: "Enviar código",
			otp: "Código de verificação",
			otpPlaceholder: "Informe o código",
			verify: "Verificar código",
		},

		email: {
			title: "Verificação de e-mail",
			verifying: "Verificando seu e-mail",
			confirming: "Confirmando {{email}}",
			moment: "Isso leva só um instante...",
			verified: "E-mail verificado",
			verifiedDescription: "Seu endereço de e-mail foi confirmado",
			redirecting: "Levando você para o painel...",
		},

		success: {
			title: "Tudo certo",
			message: "Sua conta foi criada e verificada.",
			continue: "Continuar",
		},

		fields: {
			email: "E-mail",
			emailPlaceholder: "Informe seu e-mail",
			password: "Senha",
			passwordPlaceholder: "Informe sua senha",
			createPassword: "Crie uma senha",
			confirmPassword: "Confirmar senha",
			confirmPasswordPlaceholder: "Repita a senha",
			phone: "Telefone",
			phonePlaceholder: "Informe seu telefone",
		},

		strength: {
			label: "Força da senha",
			tooWeak: "Muito fraca",
			weak: "Fraca",
			medium: "Média",
			strong: "Forte",
		},
	},

	countries: {
		br: "Brasil",
		us: "Estados Unidos",
		pt: "Portugal",
		ca: "Canadá",
		uk: "Reino Unido",
		de: "Alemanha",
		fr: "França",
		jp: "Japão",
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
		expandRow: "Mostrar detalhes",
		collapseRow: "Ocultar detalhes",
		expandAll: "Expandir todas as linhas",
		collapseAll: "Recolher todas as linhas",
		recent: "Movimentações recentes",

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

	import: {
		title: "Importar extrato",
		subtitle: "Traga movimentações de um extrato bancário em CSV",
		nav: "Importar",

		historyTitle: "Envios",
		historyHint: "Todos os extratos que você trouxe, do mais recente para o mais antigo",
		historyEmpty: "Nada foi importado ainda",
		historyError: "Não foi possível carregar o histórico de envios",
		uploadedAt: "Enviado em {{date}}",
		rowsSummary: "{{imported}} de {{total}} linhas",
		removeUpload: "Remover do histórico",
		uploadRemoved: "Removido do histórico",

		statuses: {
			processing: "Importando",
			completed: "Concluído",
			partial: "Parcialmente importado",
			failed: "Falhou",
		},

		dropTitle: "Solte seu CSV aqui",
		dropHint: "ou clique para escolher um arquivo — apenas .csv, até {{size}} MB",
		chooseFile: "Escolher arquivo",
		replaceFile: "Escolher outro arquivo",
		fileSummary: "{{name}} · {{count}} linha",
		fileSummary_plural: "{{name}} · {{count}} linhas",

		onlyCsv: "Só é possível importar arquivos .csv",
		emptyFile: "Este arquivo não tem linhas",
		readError: "Não foi possível ler o arquivo",
		tooLarge: "O arquivo é maior que {{size}} MB",

		columnsTitle: "Relacione as colunas",
		columnsHint:
			"Adivinhamos pelo cabeçalho — ajuste o que estiver diferente.",
		hasHeader: "A primeira linha contém os nomes das colunas",
		ignore: "Não importar",
		column: "Coluna {{index}}",

		defaults: "Padrões",
		defaultCategory: "Categoria para linhas sem correspondência",
		defaultCategoryHint:
			"Usada quando o arquivo não traz categoria ou traz uma que não conhecemos.",
		defaultWallet: "Carteira",

		previewTitle: "Pré-visualização",
		previewHint: "Mostrando as primeiras {{count}} de {{total}} linhas",
		ready: "{{count}} pronta para importar",
		ready_plural: "{{count}} prontas para importar",
		skipped: "{{count}} será ignorada",
		skipped_plural: "{{count}} serão ignoradas",
		status: "Situação",
		rowOk: "Pronta",
		rowInvalid: "Faltando: {{fields}}",

		importAction: "Importar {{count}} movimentação",
		importAction_plural: "Importar {{count}} movimentações",
		importing: "Importando {{done}} de {{total}}...",
		imported: "{{count}} movimentação importada",
		imported_plural: "{{count}} movimentações importadas",
		importFailed: "Não foi possível importar o extrato",
		partial: "{{imported}} importadas, {{failed}} com falha",
		noValidRows: "Nenhuma linha deste arquivo pode ser importada ainda",
		startOver: "Importar outro arquivo",
		viewTransactions: "Ver as movimentações",
	},

	wallets: {
		title: "Carteiras",
		subtitle: "Contas, cartões e dinheiro que você acompanha",
		add: "Nova carteira",
		edit: "Editar carteira",
		empty: "Nenhuma carteira cadastrada",
		emptyHint: "Crie uma carteira para começar a organizar seus saldos.",
		loadError: "Não foi possível carregar as carteiras",
		saveError: "Não foi possível salvar a carteira",
		deleteError: "Não foi possível excluir a carteira",
		created: "Carteira criada",
		updated: "Carteira atualizada",
		deleted: "Carteira excluída",
		deleteConfirmTitle: "Excluir carteira?",
		deleteConfirmDescription:
			"Esta ação não pode ser desfeita. A carteira “{{name}}” será removida permanentemente.",
		totalBalance: "Saldo total",
		availableBalance: "Saldo disponível",
		creditLimit: "Limite de crédito",
		positiveBalances: "Saldos positivos",
		negativeBalances: "Valores devidos",
		balanceOverTime: "Saldo ao longo do tempo",
		distribution: "Saldo por carteira",
		count: "{{count}} carteira",
		count_plural: "{{count}} carteiras",

		fields: {
			name: "Nome",
			type: "Tipo",
			balance: "Saldo atual",
			currency: "Moeda",
			creditLimit: "Limite de crédito",
		},

		placeholders: {
			name: "ex.: Conta corrente",
			balance: "0,00",
			creditLimit: "0,00",
			selectType: "Selecione o tipo",
			selectCurrency: "Selecione a moeda",
		},

		types: {
			checking: "Conta corrente",
			savings: "Poupança",
			credit: "Cartão de crédito",
			cash: "Dinheiro",
			investment: "Investimentos",
		},

		validation: {
			nameRequired: "Informe um nome",
			typeRequired: "Escolha um tipo",
			balanceInvalid: "Informe um saldo válido",
			creditLimitInvalid: "Informe um limite válido",
		},
	},

	budgets: {
		title: "Orçamentos",
		subtitle: "Limites de gasto por categoria",
		add: "Novo orçamento",
		edit: "Editar orçamento",
		empty: "Nenhum orçamento cadastrado",
		emptyHint: "Defina um limite por categoria para controlar os gastos.",
		loadError: "Não foi possível carregar os orçamentos",
		saveError: "Não foi possível salvar o orçamento",
		deleteError: "Não foi possível excluir o orçamento",
		created: "Orçamento criado",
		updated: "Orçamento atualizado",
		deleted: "Orçamento excluído",
		deleteConfirmTitle: "Excluir orçamento?",
		deleteConfirmDescription:
			"Esta ação não pode ser desfeita. O orçamento “{{name}}” será removido permanentemente.",
		spent: "Gasto",
		limit: "Limite",
		remaining: "Disponível",
		exceededBy: "Ultrapassou em {{amount}}",
		usage: "{{percent}}% utilizado",
		allCategories: "Todas as categorias",
		totalBudgeted: "Total orçado",
		totalSpent: "Total gasto",
		monthlyTrend: "Evolução mensal dos gastos",
		details: "Detalhes do orçamento",
		dailyAverage: "Média diária",
		projected: "Projeção para o mês",
		daysLeft: "Falta {{count}} dia no mês",
		daysLeft_plural: "Faltam {{count}} dias no mês",
		onTrack: "No ritmo certo",
		spendingFast: "Gastando mais rápido que o planejado",
		willExceed: "Nesse ritmo o limite estoura antes de o mês acabar",
		relatedTransactions: "Movimentações deste orçamento",
		noTransactions: "Nada lançado neste orçamento ainda",
		spentOf: "{{spent}} de {{limit}}",

		fields: {
			name: "Nome",
			amount: "Valor",
			period: "Período",
			category: "Categoria",
		},

		placeholders: {
			name: "ex.: Mercado",
			amount: "0,00",
			selectPeriod: "Selecione o período",
			selectCategory: "Selecione uma categoria",
		},

		periods: {
			week: "Semanal",
			month: "Mensal",
			quarter: "Trimestral",
			year: "Anual",
		},

		validation: {
			nameRequired: "Informe um nome",
			amountRequired: "Informe um valor maior que zero",
			periodRequired: "Escolha um período",
		},
	},

	goals: {
		title: "Metas",
		subtitle: "Aquilo que você está juntando dinheiro para conquistar",
		add: "Nova meta",
		edit: "Editar meta",
		empty: "Nenhuma meta cadastrada",
		emptyHint: "Crie uma meta para acompanhar quanto já guardou.",
		loadError: "Não foi possível carregar as metas",
		saveError: "Não foi possível salvar a meta",
		deleteError: "Não foi possível excluir a meta",
		created: "Meta criada",
		updated: "Meta atualizada",
		deleted: "Meta excluída",
		deleteConfirmTitle: "Excluir meta?",
		deleteConfirmDescription:
			"Esta ação não pode ser desfeita. A meta “{{name}}” será removida permanentemente.",
		saved: "Guardado",
		target: "Objetivo",
		remaining: "Falta",
		completed: "Concluída",
		deadline: "Prazo",
		noDeadline: "Sem prazo",
		totalSaved: "Total guardado",
		totalTarget: "Objetivo total",
		progress: "{{percent}}% do objetivo",
		details: "Detalhes da meta",
		monthlyNeeded: "Necessário por mês",
		monthsLeft: "Falta {{count}} mês para o prazo",
		monthsLeft_plural: "Faltam {{count}} meses para o prazo",
		overdue: "O prazo já passou",
		onTrack: "No ritmo certo",
		addContribution: "Guardar nesta meta",
		contributionAmount: "Valor a guardar",
		contribute: "Guardar",
		contributionAdded: "Meta atualizada",
		contributionInvalid: "Informe um valor maior que zero",
		completedHint: "Objetivo alcançado — parabéns.",
		linkedWallet: "Dinheiro guardado em",

		fields: {
			name: "Nome",
			target: "Valor do objetivo",
			saved: "Já guardado",
			deadline: "Prazo",
			wallet: "Carteira",
		},

		placeholders: {
			name: "ex.: Reserva de emergência",
			target: "0,00",
			saved: "0,00",
			selectWallet: "Selecione uma carteira",
		},

		validation: {
			nameRequired: "Informe um nome",
			targetRequired: "Informe um valor maior que zero",
			savedInvalid: "O valor guardado não pode ser maior que o objetivo",
		},
	},

	tags: {
		title: "Tags",
		subtitle: "Etiquetas que você pode aplicar às movimentações",
		add: "Nova tag",
		edit: "Editar tag",
		empty: "Nenhuma tag cadastrada",
		emptyHint:
			"Crie uma tag para agrupar movimentações de categorias diferentes.",
		loadError: "Não foi possível carregar as tags",
		saveError: "Não foi possível salvar a tag",
		deleteError: "Não foi possível excluir a tag",
		created: "Tag criada",
		updated: "Tag atualizada",
		deleted: "Tag excluída",
		deleteConfirmTitle: "Excluir tag?",
		deleteConfirmDescription:
			"Esta ação não pode ser desfeita. A tag “{{name}}” será removida permanentemente.",
		count: "{{count}} tag",
		count_plural: "{{count}} tags",
		preview: "Pré-visualização",

		fields: {
			name: "Nome",
			color: "Cor",
		},

		placeholders: {
			name: "ex.: Recorrente",
		},

		validation: {
			nameRequired: "Informe um nome",
			nameDuplicated: "Já existe uma tag com esse nome",
		},
	},

	categories: {
		title: "Categorias",
		subtitle: "Como suas receitas e despesas são agrupadas",
		add: "Nova categoria",
		edit: "Editar categoria",
		empty: "Nenhuma categoria cadastrada",
		created: "Categoria criada",
		updated: "Categoria atualizada",
		deleted: "Categoria excluída",
		saveError: "Não foi possível salvar a categoria",
		deleteError: "Não foi possível excluir a categoria",
		deleteConfirmTitle: "Excluir categoria?",
		deleteConfirmDescription:
			"Esta ação não pode ser desfeita. A categoria “{{name}}” será removida permanentemente.",

		fields: {
			name: "Nome",
			description: "Descrição",
			color: "Cor",
			type: "Tipo",
			available: "Disponível",
		},

		placeholders: {
			name: "Nome da categoria",
			description: "O que entra nessa categoria?",
			selectType: "Selecione o tipo",
		},

		types: {
			earnings: "Receitas",
			expenses: "Despesas",
		},

		validation: {
			nameRequired: "Informe um nome",
			typeRequired: "Escolha um tipo",
		},
	},

	settings: {
		title: "Configurações",
		subtitle: "Preferências da sua conta e do ambiente",
		menu: "Seção de configurações",

		tabs: {
			account: "Conta",
			general: "Geral",
			profile: "Perfil",
			addBank: "Adicionar banco",
			security: "Segurança",
			session: "Sessões",
			categories: "Categorias",
			currencies: "Moedas",
			tags: "Tags",
			api: "API",
		},

		general: {
			preferences: "Preferências",
			primaryCurrency: "Moeda principal",
			timeZone: "Fuso horário",
			notifications: "Notificações",
			notifyMoney: "Recebo ou envio dinheiro",
			notifyMerchant: "Chega um pedido de cobrança",
			notifyRecommendations: "Existem recomendações para a minha conta",
			saved: "Preferências salvas",
		},

		profileForm: {
			userProfile: "Perfil do usuário",
			avatarHint: "O arquivo pode ter no máximo 20 MB",
			chooseFile: "Escolher arquivo",
			noFileChosen: "Nenhum arquivo escolhido",
			credentials: "Dados de acesso",
			newEmail: "Novo e-mail",
			newPassword: "Nova senha",
			twoFactorHint: "Ative a verificação em duas etapas na aba Segurança",
			personalInformation: "Informações pessoais",
			fullName: "Nome completo",
		},

		api: {
			createTitle: "Criar chave de API",
			generateKey: "Gerar nova chave",
			confirmPassphrase: "Confirme a senha",
			keysTitle: "Suas chaves de API",
			key: "Chave",
			status: "Status",
			empty: "Nenhuma chave de API cadastrada",
		},

		currencies: {
			rate: "1 {{from}} = {{rate}} {{to}}",
			exchangeTitle: "Câmbio",
			currency: "Moeda",
			paymentMethod: "Forma de pagamento",
			amount: "Valor",
			monthlyLimit: "Limite mensal",
			remaining: "{{amount}} disponível",
			exchangeNow: "Converter agora",
			detailsTitle: "Detalhes da conversão",
			exchangeAmount: "Valor",
			exchangeRate: "Cotação",
			fee: "Taxa",
			vat: "Impostos",
			subtotal: "Subtotal",

			methods: {
				bank: "Transferência bancária",
				card: "Cartão de crédito",
				pix: "Pix",
				wallet: "Carteira digital",
			},
		},

		session: {
			thirdParty: "Aplicativos de terceiros",
			thirdPartyEmpty: "Você ainda não autorizou nenhum aplicativo.",
			thirdPartyHint:
				"Depois de conectar um aplicativo à sua conta, você pode gerenciar ou revogar o acesso por aqui.",
			authorizeNow: "Autorizar um aplicativo",
			webSessions: "Sessões na web",
			confirmedDevices: "Dispositivos confirmados",
			accountActivity: "Atividade da conta",
			closeAccount: "Encerrar conta",
			closeAccountHint: "Resgate seu saldo e encerre a conta —",
			cannotBeUndone: "esta ação não pode ser desfeita.",
			closeAccountAction: "Encerrar minha conta",

			columns: {
				signedIn: "Acesso",
				confirmed: "Confirmado",
				browser: "Navegador",
				ipAddress: "Endereço IP",
				near: "Perto de",
				current: "Atual",
				action: "Ação",
				source: "Origem",
				location: "Local",
				when: "Quando",
			},

			actions: {
				signin: "Entrou na conta",
				signout: "Saiu da conta",
				secondFactor: "Segundo fator verificado",
				deviceConfirmed: "Dispositivo confirmado",
			},

			sources: {
				api: "API",
				web: "Web",
			},
		},

		security: {
			idCardTitle: "Documento de identidade",
			emailTitle: "Verificação de e-mail",
			phoneTitle: "Verificação de telefone",
			verified: "Verificado",
			pending: "Verificação pendente",
			chooseFile: "Escolher arquivo",
			dropHint: "Arraste o documento até aqui ou clique para procurar",
			formatsHint: "Formatos aceitos: JPG, PNG, PDF. Tamanho máximo: 5 MB",

			addId: "Adicionar documento",
			addIdDescription:
				"Envie um documento de identificação para confirmarmos quem você é.",
			idType: "Tipo de documento",
			idNumber: "Número do documento",
			idNumberPlaceholder: "Informe o número do documento",
			expiryDate: "Data de validade",
			uploadId: "Enviar documento",
			submitVerification: "Enviar para verificação",

			addEmail: "Adicionar e-mail",
			addEmailDescription:
				"Informe um novo e-mail. Enviaremos um código para confirmá-lo.",
			emailAddress: "Endereço de e-mail",
			emailPlaceholder: "Informe seu e-mail",
			purpose: "Finalidade",
			verificationCode: "Código de verificação",
			sendCode: "Enviar código",
			emailCodeHint: "Informe o código de 6 dígitos enviado para o seu e-mail",
			verifyAddEmail: "Verificar e adicionar",

			addPhone: "Adicionar telefone",
			addPhoneDescription:
				"Informe um novo telefone. Enviaremos um código por SMS para confirmá-lo.",
			country: "País",
			phoneNumber: "Telefone",
			phonePlaceholder: "Informe seu telefone",
			smsCode: "Código do SMS",
			smsCodeHint: "Informe o código de 6 dígitos enviado para o seu telefone",
			verifyAddPhone: "Verificar e adicionar",

			idTypes: {
				passport: "Passaporte",
				driver: "CNH",
				national: "RG",
			},

			purposes: {
				primary: "Principal",
				work: "Trabalho",
				personal: "Pessoal",
				recovery: "Recuperação",
			},

			passwordTitle: "Senha",
			currentPassword: "Senha atual",
			newPassword: "Nova senha",
			confirmPassword: "Confirme a nova senha",
			updatePassword: "Atualizar senha",
		},

		bank: {
			title: "Contas bancárias e cartões",
			manage: "Gerenciar",
			verified: "Verificado",
			addBank: "Adicionar conta bancária",
			addCard: "Adicionar cartão",
			saveChanges: "Salvar alterações",
			defaultMethod: "Definir como forma de pagamento padrão",

			manageBankTitle: "Gerenciar conta bancária",
			manageBankDescription: "{{name}} — conta terminada em {{digits}}",
			nickname: "Apelido da conta",
			editDetails: "Editar dados",
			removeAccount: "Remover conta",

			editBankTitle: "Editar conta bancária",
			editBankDescription: "Atualize os dados da sua conta abaixo.",
			bankName: "Banco",
			accountNumber: "Número da conta",
			routingNumber: "Agência",
			accountType: "Tipo de conta",
			accountHolder: "Titular da conta",

			manageCardTitle: "Gerenciar cartão",
			manageCardDescription: "{{name}} — cartão terminado em {{digits}}",
			cardNickname: "Apelido do cartão",
			billingAddress: "Endereço de cobrança",
			editCardDetails: "Editar dados do cartão",
			removeCard: "Remover cartão",

			editCardTitle: "Editar cartão",
			editCardDescription: "Atualize os dados do seu cartão abaixo.",
			nameOnCard: "Nome impresso no cartão",
			cardNumber: "Número do cartão",
			cardNumberHint:
				"Por segurança, o número do cartão não pode ser alterado. Adicione um novo cartão.",
			expiryDate: "Validade",
			cvv: "CVV",
			cardType: "Bandeira",

			addBankTitle: "Nova conta bancária",
			addBankDescription: "Informe os dados bancários para conectar a conta.",
			addCardTitle: "Novo cartão",
			addCardDescription:
				"Informe os dados do cartão para adicionar a forma de pagamento.",

			accountTypes: {
				checking: "Conta corrente",
				savings: "Poupança",
				business: "Conta empresarial",
			},

			billingAddresses: {
				home: "Endereço residencial",
				work: "Endereço comercial",
				other: "Outro endereço",
			},

			cardTypes: {
				visa: "Visa",
				mastercard: "Mastercard",
				amex: "American Express",
				elo: "Elo",
			},
		},

		account: {
			welcome: "Boas-vindas, {{name}}!",
			unverifiedHint:
				"Sua conta ainda não foi verificada. Verifique para usar todos os recursos.",
			verifyAccount: "Verificar conta",
			twoFactor: "Verificação em duas etapas (2FA)",

			verifyUpgrade: "Verificação",
			status: "Status da conta",
			statusPending: "Pendente",
			unverifiedDescription:
				"Uma conta não verificada não movimenta dinheiro. Verifique para liberar.",
			getVerified: "Verificar agora",

			information: "Informações",
			userId: "ID do usuário",
			emailAddress: "Endereço de e-mail",
			joinedSince: "Membro desde",
			type: "Tipo",
			countryOfResidence: "País de residência",

			downloadApp: "Aplicativo",
			downloadAppHint:
				"Verificar sua identidade pelo aplicativo é mais rápido e seguro.",
			appStore: "App Store",
			googlePlay: "Google Play",

			editTitle: "Editar informações da conta",
			editDescription:
				"O ID do usuário e a data de entrada não podem ser alterados.",
			emailChangeHint:
				"Alterar o e-mail exige a verificação do novo endereço.",
			accountType: "Tipo de conta",
			countryChangeHint:
				"Alterar o país pode mudar as regras aplicadas à sua conta.",
			importantTitle: "Vale saber",
			importantHint:
				"Atualizar seus dados pode exigir verificação extra. Algumas alterações levam até 48 horas.",
			saveChanges: "Salvar alterações",

			twoFactorTitle: "Verificação em duas etapas",
			twoFactorDescription:
				"Adicione uma camada extra de segurança exigindo um segundo passo no login.",
			authenticatorApp: "Aplicativo autenticador",
			smsVerification: "SMS",
			qrHint:
				"Leia este QR code com seu aplicativo autenticador (Google Authenticator, Authy, …).",
			enterCode: "Código de verificação",
			codePlaceholder: "Código de 6 dígitos",
			phoneNumber: "Telefone",
			sendCode: "Enviar código",
			backupCodesSaved: "Guardei meus códigos de recuperação",
			backupCodesHint:
				"Os códigos de recuperação permitem entrar caso você perca o celular.",
			downloadBackupCodes: "Baixar códigos de recuperação",
			enable2fa: "Ativar 2FA",

			verifyTitle: "Verificar sua conta",
			verifyDescription:
				"Conclua as etapas abaixo para liberar todos os recursos.",
			step1: "Etapa 1: informações pessoais",
			step2: "Etapa 2: documento",
			step3: "Etapa 3: selfie",
			continueToId: "Continuar para o documento",
			continueToSelfie: "Continuar para a selfie",
			submitVerification: "Enviar verificação",
			idTypeLabel: "Tipo de documento",
			idNumberPlaceholder: "Informe o número do documento",
			uploadFront: "Frente do documento",
			uploadBack: "Verso do documento",
			selfieHint:
				"Tire uma selfie nítida segurando o documento ao lado do rosto. Os dois precisam estar legíveis.",
			takePhoto: "Tirar foto",
			uploadPhoto: "Enviar foto",
			selfieDisclaimer:
				"Sua selfie é usada apenas para verificação de identidade.",
			tipsTitle: "Dicas",
			tip1: "Garanta uma boa iluminação",
			tip2: "Tire óculos, bonés ou qualquer coisa que cubra o rosto",
			tip3: "Segure o documento ao lado do rosto, sem cobri-lo",
			tip4: "Todo o texto do documento precisa estar legível",

			accountTypes: {
				personal: "Pessoal",
				business: "Empresarial",
				corporate: "Corporativa",
			},

			idTypes: {
				passport: "Passaporte",
				driving: "CNH",
				national: "RG",
			},
		},

		categories: {
			createTitle: "Nova categoria",
			incomeTitle: "Categorias de receita",
			expenseTitle: "Categorias de despesa",
			emptyIncome: "Nenhuma categoria de receita cadastrada",
			emptyExpense: "Nenhuma categoria de despesa cadastrada",
			icon: "Ícone",
			choose: "Escolher...",
			preview: "Pré-visualização",

			icons: {
				sparkles: "Beleza",
				file: "Documentos",
				car: "Carro",
				education: "Educação",
				entertainment: "Entretenimento",
				family: "Família",
				food: "Alimentação",
				salary: "Salário",
				groceries: "Mercado",
				healthcare: "Saúde",
				home: "Moradia",
				shopping: "Compras",
				sports: "Esportes",
				hobbies: "Hobbies",
				travel: "Viagem",
				transport: "Transporte",
				work: "Trabalho",
				business: "Negócios",
				gifts: "Presentes",
				insurance: "Seguro",
				loan: "Empréstimo",
				other: "Outros",
			},
		},
	},

	dashboard: {
		title: "Painel",
		subtitle: "Uma visão geral das suas finanças",
		totalBalance: "Saldo total",
		periodChange: "Variação no período",
		periodExpenses: "Despesas no período",
		periodIncome: "Receitas no período",
		lastMonth: "Mês anterior {{value}}",
		balanceTrends: "Evolução do saldo",
		expensesBreakdown: "Composição das despesas",
		monthlyBudgets: "Orçamentos do mês",
		incomeVsExpenses: "Receitas x despesas",
		weeklyExpenses: "Despesas da semana",
		paymentsHistory: "Histórico de pagamentos",
		savingGoals: "Metas de economia",
		transactionHistory: "Histórico de movimentações",
		periodLabel: "Últimos 30 dias",
		vsPrevious: "vs período anterior",
		expensesByCategory: "Despesas por categoria",
		noBudgets: "Nenhum orçamento definido",
		noGoals: "Nenhuma meta definida",
		uncategorized: "Sem categoria",
		empty: "Ainda não há dados para exibir",
	},

	insights: {
		title: "Insights",
		subtitle: "O que seus números estão dizendo neste mês",
		empty: "Ainda não há movimentação suficiente neste mês para dizer algo útil",
		emptyHint:
			"Lance algumas movimentações — ou importe um extrato — e volte aqui.",
		refreshed: "Com base em {{month}}",

		summary: {
			income: "Receitas do mês",
			expenses: "Gasto no mês",
			net: "Sobrou",
			savingsRate: "Taxa de economia",
		},

		sections: {
			attention: "Precisa da sua atenção",
			context: "Vale saber",
			wins: "Indo bem",
			whereItGoes: "Para onde vai o dinheiro",
		},

		recurringTitle: "Cobranças recorrentes",
		recurringEmpty: "Nada se repete nos últimos três meses ainda",
		recurringMonthly: "{{amount}} por mês",

		items: {
			spendingUp: {
				title: "Os gastos subiram",
				body: "Você já gastou {{current}} — {{percent}}% a mais que no mesmo ponto do mês passado ({{previous}}).",
			},
			spendingDown: {
				title: "Os gastos caíram",
				body: "Você já gastou {{current}} — {{percent}}% a menos que no mesmo ponto do mês passado ({{previous}}).",
			},
			spendingSteady: {
				title: "Os gastos estão estáveis",
				body: "{{current}} até agora, em linha com o mês passado.",
			},
			savingsRate: {
				title: "Você está guardando {{percent}}% do que entrou",
				body: "São {{saved}} ainda não gastos neste mês.",
			},
			spendingOverIncome: {
				title: "Gastando mais do que ganhou",
				body: "O mês está {{percent}}% acima da sua receita — {{saved}} no vermelho.",
			},
			topCategory: {
				title: "{{category}} lidera o mês",
				body: "{{amount}}, o que representa {{percent}}% de tudo que foi gasto.",
			},
			budgetExceeded: {
				title: "Um orçamento estourou",
				body: "{{name}} está em {{percent}}% do limite. {{count}} orçamento precisa de atenção.",
			},
			budgetAtRisk: {
				title: "Um orçamento vai estourar",
				body: "Nesse ritmo, {{name}} termina o mês em torno de {{projected}}.",
			},
			budgetsHealthy: {
				title: "Orçamentos sob controle",
				body: "Todos os {{count}} estão dentro do ritmo previsto.",
			},
			goalOverdue: {
				title: "Uma meta passou do prazo",
				body: "{{name}} não chegou a tempo — vale rever a data ou o objetivo.",
			},
			goalPace: {
				title: "{{name}} precisa de {{amount}} por mês",
				body: "Está {{percent}}% financiada e esse é o ritmo para terminar no prazo.",
			},
			creditUsage: {
				title: "{{name}} está perto do limite",
				body: "{{percent}}% da linha de crédito já está comprometida.",
			},
			recurring: {
				title: "{{count}} cobranças se repetem todo mês",
				body: "Cerca de {{amount}} por mês, lideradas por {{top}}.",
			},
			incomeUp: {
				title: "As receitas subiram",
				body: "Entraram {{current}} neste mês — {{percent}}% a mais que no mesmo ponto do mês passado.",
			},
			incomeDown: {
				title: "As receitas caíram",
				body: "{{current}} até agora — {{percent}}% a menos que no mesmo ponto do mês passado ({{previous}}).",
			},
			projectedSpending: {
				title: "Caminhando para gastar {{projected}}",
				body: "É onde o mês termina se o ritmo atual continuar.",
			},
			projectedOverIncome: {
				title: "O mês vai passar da sua receita",
				body: "Nesse ritmo você vai gastar {{projected}} — {{gap}} a mais do que entrou.",
			},
			categorySpike: {
				title: "{{category}} está acelerando",
				body: "{{amount}} até agora, {{percent}}% acima dos {{average}} que costuma alcançar nesta altura.",
			},
			categoryDrop: {
				title: "{{category}} desacelerou",
				body: "{{amount}} até agora, {{percent}}% abaixo dos {{average}} que costuma alcançar nesta altura.",
			},
			budgetRoom: {
				title: "{{name}} ainda tem folga",
				body: "{{amount}} sem uso com o mês quase no fim — pode virar meta.",
			},
			goalCompleted: {
				title: "{{name}} foi concluída",
				body: "Objetivo alcançado. {{count}} meta concluída.",
				body_plural: "Objetivo alcançado. {{count}} metas concluídas.",
			},
			emergencyStrong: {
				title: "{{months}} meses de reserva",
				body: "{{amount}} guardados — bem mais que um mês típico de gastos.",
			},
			emergencyCoverage: {
				title: "{{months}} meses de reserva",
				body: "{{amount}} guardados, medidos contra o seu gasto mensal habitual.",
			},
			emergencyThin: {
				title: "Menos de um mês de reserva",
				body: "{{amount}} guardados diante de um mês típico de gastos.",
			},
			possibleDuplicate: {
				title: "Possível cobrança duplicada",
				body: "{{description}} de {{amount}} aparece duas vezes em poucos dias — vale conferir.",
				body_plural: "{{count}} cobranças aparecem duas vezes em poucos dias, começando por {{description}} de {{amount}}.",
			},
			uncategorized: {
				title: "Lançamentos sem categoria",
				body: "{{count}} lançamento deste mês está sem categoria, somando {{amount}}.",
				body_plural: "{{count}} lançamentos deste mês estão sem categoria, somando {{amount}}.",
			},
			weekdayPattern: {
				title: "{{weekday}} é seu dia mais caro",
				body: "{{percent}}% do gasto do mês cai em {{weekday}} — {{amount}}.",
			},
			smallCharges: {
				title: "As pequenas cobranças somam",
				body: "{{count}} cobrança pequena representa {{amount}}, {{percent}}% do mês.",
				body_plural: "{{count}} cobranças pequenas somam {{amount}}, {{percent}}% do mês.",
			},
			walletConcentration: {
				title: "A maior parte dos gastos passa por {{name}}",
				body: "{{percent}}% do mês — {{amount}}.",
			},
			biggestExpense: {
				title: "Uma cobrança domina o mês",
				body: "{{description}} levou {{amount}} — {{percent}}% de tudo que foi gasto.",
			},
		},
	},

	topExpenses: {
		title: "Maiores despesas do mês",
		subtitle: "Para onde foi a maior parte de {{month}}",
		empty: "Nenhuma despesa registrada neste mês",
		share: "{{percent}}% do mês",
		total: "As {{count}} maiores somam {{amount}}",
		rank: "#{{position}}",
	},

	analytics: {
		title: "Análises",
		subtitle: "Tendências das suas receitas e despesas",

		tabs: {
			overview: "Visão geral",
			expenses: "Despesas",
			income: "Receitas",
			incomeVsExpenses: "Receitas x despesas",
			balance: "Saldo",
			history: "Histórico de movimentações",
		},

		totalIncome: "Total de receitas",
		totalExpenses: "Total de despesas",
		netBalance: "Saldo do período",
		byCategory: "Por categoria",
		byMonth: "Por mês",
		averagePerMonth: "Média mensal",
		biggestExpense: "Maior despesa",
		biggestIncome: "Maior receita",
		savingsRate: "Taxa de economia",
		savings: "Economia",
		activeCategories: "Categorias ativas",
		share: "Participação",
		balanceEvolution: "Evolução do saldo",
		empty: "Dados insuficientes para este período",
	},

	profile: {
		title: "Perfil",
		subtitle: "Seus dados pessoais",
		personalInfo: "Informações pessoais",
		contact: "Contato",
		preferences: "Preferências",
		memberSince: "Membro desde {{date}}",
		editProfile: "Editar perfil",
		plan: "Premium",
		monthlyBudget: "Orçamento do mês",
		spentPercent: "{{percent}}% gasto",
		remainingPercent: "{{percent}}% disponível",
		recentSpending: "Gastos recentes",
		activeWallet: "Carteira principal",
		secondaryWallet: "Carteira secundária",
		manage: "Gerenciar",
		noWallets: "Nenhuma carteira conectada",
		saved: "Perfil atualizado",

		fields: {
			firstName: "Nome",
			lastName: "Sobrenome",
			email: "E-mail",
			phone: "Telefone",
			birthDate: "Data de nascimento",
			address: "Endereço",
			city: "Cidade",
			postalCode: "CEP",
			country: "País",
			language: "Idioma",
			currency: "Moeda",
		},
	},
};

export default ptBR;
