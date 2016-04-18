const requireAll = (requireContext) => { requireContext.keys().map(requireContext); };

requireAll(require.context('./spec/helpers/', true, /\.ts$/));
requireAll(require.context('./app/', true, /[sS]pec\.ts$/));