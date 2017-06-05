```
@echo off

set ruby_exe=C:\Ruby23-x64\bin\ruby.exe
set daemon_bin_path=%~dp0

cd ..\

set redmine_home=%CD%

cd %daemon_bin_path%

  

set startupOptions=++StartMode=exe
set startupOptions=%startupOptions% --StartPath=%redmine_home%\
set startupOptions=%startupOptions% --StartImage=%ruby_exe%
set startupOptions=%startupOptions% ++StartParams=bin/rails;server;-b;0.0.0.0;-e;production



set stopOptions=--StopMode=exe
set stopOptions=%stopOptions% --StopPath=%redmine_home%\
set stopOptions=%stopOptions% --StopImage=%ComSpec%
set stopOptions=%stopOptions% ++StopParams=/c;taskkill;/F;/FI
set stopOptions=%stopOptions% "++StopParams="""MODULES eq nokogiri.so""""
set stopOptions=%stopOptions% ++StopParams=/IM;ruby.exe


set loggingOptions=--LogLevel=Info
set loggingOptions=%loggingOptions% --LogPath=%redmine_home%\log\
set loggingOptions=%loggingOptions% --LogPrefix=redmine-commons-daemon
set loggingOptions=%loggingOptions% --StdOutput=%redmine_home%\log\redmine_stdout.log
set loggingOptions=%loggingOptions% --StdError=%redmine_home%\log\redmine_stderr.log

redmine.exe //IS//redmine  %startupOptions% %stopOptions% %loggingOptions%







