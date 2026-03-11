import EGILoginSection from "../_common/EGILoginSection";

function LoginPage() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "400px",
        marginTop: "100px",
      }}
    >
      <EGILoginSection />
    </div>
  );
}

export default LoginPage;
