import MainLayout from "../components/layout/MainLayout";

const PackingChecklist = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-6xl mb-4">🎒</div>
          <h1 className="text-2xl font-bold" style={{ color: "#1B4332" }}>
            Packing Checklist
          </h1>
          <p style={{ color: "#40916C" }}>Coming in Phase 10</p>
        </div>
      </div>
    </MainLayout>
  );
};
export default PackingChecklist;
