import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { DashboardPage } from './pages/DashboardPage'
import { CommLinkInboxPage } from './pages/CommLinkInboxPage'
import { DiscoveryConfirmPage } from './pages/discovery/DiscoveryConfirmPage'
import { DiscoveryResultsPage } from './pages/discovery/DiscoveryResultsPage'
import { DiscoverySearchPage } from './pages/discovery/DiscoverySearchPage'
import { IdentityRevealPage } from './pages/discovery/IdentityRevealPage'
import { SupplierMessagePage } from './pages/discovery/SupplierMessagePage'
import { SupplierProfilePage } from './pages/discovery/SupplierProfilePage'
import { SupplyAccessGatePage } from './pages/discovery/SupplyAccessGatePage'
import { MeshBoardPage } from './pages/mesh/MeshBoardPage'
import { MeshCompletePage } from './pages/mesh/MeshCompletePage'
import { MeshConfirmPage } from './pages/mesh/MeshConfirmPage'
import { MeshListingPage } from './pages/mesh/MeshListingPage'
import { MeshLogisticsPage } from './pages/mesh/MeshLogisticsPage'
import { MeshPostNeedPage } from './pages/mesh/MeshPostNeedPage'
import { MeshVouchPage } from './pages/mesh/MeshVouchPage'
import { ProfilePage } from './pages/ProfilePage'
import { ScarcityFlowPage } from './pages/scarcity/ScarcityFlowPage'
import { TrustCardPage } from './pages/TrustCardPage'
import { TrustActivityPage } from './pages/TrustActivityPage'
import { VouchActionDetailPage } from './pages/VouchActionDetailPage'
import { VouchActionListPage } from './pages/VouchActionListPage'
import { VouchScorePage } from './pages/VouchScorePage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell showNav />}>
        <Route index element={<DashboardPage />} />
        <Route path="discovery" element={<DiscoverySearchPage />} />
        <Route path="mesh" element={<MeshBoardPage />} />
        <Route path="comm-link" element={<CommLinkInboxPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="vouch-score" element={<VouchScorePage />} />
        <Route path="trust-card" element={<TrustCardPage />} />
        <Route path="trust-activity" element={<TrustActivityPage />} />
        <Route path="vouch-actions" element={<VouchActionListPage />} />
        <Route path="scarcity" element={<ScarcityFlowPage />} />
      </Route>

      <Route element={<AppShell showNav={false} subpage />}>
        <Route path="discovery/results" element={<DiscoveryResultsPage />} />
        <Route path="discovery/supplier/:supplierId" element={<SupplierProfilePage />} />
        <Route path="discovery/gate/:supplierId" element={<SupplyAccessGatePage />} />
        <Route path="discovery/confirm/:supplierId" element={<DiscoveryConfirmPage />} />
        <Route path="discovery/revealed/:supplierId" element={<IdentityRevealPage />} />
        <Route path="discovery/message/:supplierId" element={<SupplierMessagePage />} />
        <Route path="comm-link/:contactId" element={<SupplierMessagePage />} />
        <Route path="vouch-actions/:actionId" element={<VouchActionDetailPage />} />
        <Route path="mesh/item/:itemId" element={<MeshListingPage />} />
        <Route path="mesh/confirm/:itemId" element={<MeshConfirmPage />} />
        <Route path="mesh/logistics/:itemId" element={<MeshLogisticsPage />} />
        <Route path="mesh/complete/:itemId" element={<MeshCompletePage />} />
        <Route path="mesh/vouch/:itemId" element={<MeshVouchPage />} />
        <Route path="mesh/post-need" element={<MeshPostNeedPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
