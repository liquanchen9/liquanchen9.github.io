
```

@echo off

set daemon_bin_path=%~dp0

cd ..\..\

set solr_home=%CD%

cd %daemon_bin_path%


set jvmOptions=++JvmOptions=-Duser.timezone=UTC+8 
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:NewRatio=3
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:SurvivorRatio=4
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:TargetSurvivorRatio=90
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:MaxTenuringThreshold=8
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:+UseConcMarkSweepGC
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:+UseParNewGC
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:ConcGCThreads=4
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:ParallelGCThreads=4
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:+CMSScavengeBeforeRemark
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:PretenureSizeThreshold=64m
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:+UseCMSInitiatingOccupancyOnly
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:CMSInitiatingOccupancyFraction=50
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:CMSMaxAbortablePrecleanTime=6000
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:+CMSParallelRemarkEnabled
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:+ParallelRefProcEnabled
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:CMSFullGCsBeforeCompaction=1
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:CMSTriggerPermRatio=80
set jvmOptions=%jvmOptions% ++JvmOptions=-verbose:gc
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:+PrintHeapAtGC
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:+PrintGCDetails
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:+PrintGCDateStamps
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:+PrintGCTimeStamps
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:+PrintTenuringDistribution
set jvmOptions=%jvmOptions% ++JvmOptions=-XX:+PrintGCApplicationStoppedTime
set jvmOptions=%jvmOptions% ++JvmOptions=-Djetty.host=0.0.0.0
set jvmOptions=%jvmOptions% ++JvmOptions=-Xloggc:"""%solr_home%\example\example-DIH\logs\solr_gc.log"""
set jvmOptions=%jvmOptions% ++JvmOptions=-Dlog4j.configuration="""file:%solr_home%\example\resources\log4j.properties"""
set jvmOptions=%jvmOptions% ++JvmOptions=-DSTOP.PORT=7983
set jvmOptions=%jvmOptions% ++JvmOptions=-DSTOP.KEY=solrrocks
set jvmOptions=%jvmOptions% ++JvmOptions=-Djetty.port=8983
set jvmOptions=%jvmOptions% ++JvmOptions=-Dsolr.solr.home="""%solr_home%\example\example-DIH\solr"""
set jvmOptions=%jvmOptions% ++JvmOptions=-Dsolr.install.dir="""%solr_home%"""
set jvmOptions=%jvmOptions% ++JvmOptions=-Djetty.home="""%solr_home%\server"""
set jvmOptions=%jvmOptions% ++JvmOptions=-Djava.io.tmpdir="""%solr_home%\server\tmp"""

set jvmMemoryOptions=--JvmMs=128
set jvmMemoryOptions=%jvmMemoryOptions% --JvmMx=512
set jvmMemoryOptions=%jvmMemoryOptions% --JvmSs=256

set startupOptions=--StartClass=org.eclipse.jetty.start.Main
set startupOptions=%startupOptions% --StartMethod=main
set startupOptions=%startupOptions% --StartPath=%solr_home%\server\
set startupOptions=%startupOptions% ++StartParams=--module=http
set startupOptions=%startupOptions% ++StartMode=jvm

set stopOptions=--StopClass=org.eclipse.jetty.start.Main
set stopOptions=%stopOptions% --StopMethod=main
set stopOptions=%stopOptions% --StopPath=%solr_home%\server\
set stopOptions=%stopOptions% "++StopParams=STOP.PORT=7983 STOP.KEY=solrrocks --stop"
set stopOptions=%stopOptions% --StopMode=jvm


set loggingOptions=--LogLevel=Info
set loggingOptions=%loggingOptions% --LogPath=%solr_home%\example\example-DIH\logs\
set loggingOptions=%loggingOptions% --LogPrefix=solr-commons-daemon
set loggingOptions=%loggingOptions% --StdOutput=%solr_home%\example\example-DIH\logs\solr_stdout.log
set loggingOptions=%loggingOptions% --StdError=%solr_home%\example\example-DIH\logs\solr_stderr.log

solr.exe //IS//test --Jvm=auto --Classpath=%solr_home%\server\start.jar  %jvmMemoryOptions% %jvmOptions%  %startupOptions% %stopOptions% %loggingOptions%






