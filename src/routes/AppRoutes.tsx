import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from '../components/layout/RootLayout';
import { DecisionCanvasView } from '../views/DecisionCanvasView';
import { RecommendationsView } from '../views/RecommendationsView';
import { TradeoffMatrixView } from '../views/TradeoffMatrixView';
import { ProductForensicsView } from '../views/ProductForensicsView';
import { DecisionVaultView } from '../views/DecisionVaultView';
import { PersonaStudioView } from '../views/PersonaStudioView';
import { SettingsView } from '../views/SettingsView';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<DecisionCanvasView />} />
          <Route path="recommendations" element={<RecommendationsView />} />
          <Route path="tradeoffs" element={<TradeoffMatrixView />} />
          <Route path="forensics" element={<ProductForensicsView />} />
          <Route path="vault" element={<DecisionVaultView />} />
          <Route path="personas" element={<PersonaStudioView />} />
          <Route path="settings" element={<SettingsView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
