 protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        String query = "select * from customer where username='" + username + "' and password = '" + password + "'";
        Connection conn = null;
        Statement stmt = null;
        try {
            conn = DriverManager.getConnection(connectionString, dbUser, dbPassword);
            stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            stmt.close();
            conn.close();
        }
    }
