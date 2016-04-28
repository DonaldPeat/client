const requireAll = (requireContext) => { requireContext.keys().map(requireContext); };

requireAll(require.context('./tools/helpers/', true, /\.ts$/));
requireAll(require.context('./app/', true, /[sS]pec\.ts$/));