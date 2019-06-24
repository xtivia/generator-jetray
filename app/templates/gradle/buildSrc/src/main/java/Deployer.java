import aQute.bnd.osgi.Jar;
import org.osgi.framework.Bundle;
import org.osgi.framework.dto.BundleDTO;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.jar.Attributes;
import java.util.jar.Manifest;

public class Deployer {
	
	private String _host = "localhost";
	private int _port = 11311;

	public Deployer() { }

	public Deployer(int port) {
	    this._port = port;
    }
	
	/* Deploy a JAR to OSGi environment using GoGo shell.
	 * Will open the JAR to extract the bundle ID, and then invoke
	 * GoGo via telent to determine if that module ID is installed.
	 * If already instead issue an update request pointing to the supplied
	 * JAR, otherwise do an install 
	 *
	 * Accepts a second parameter indicating whether to also issue a 
	 * GoGo start requrest on the bundle. Normally this is true, but for
	 * fragment bundles it should be false
	*/
	public void deploy(File outputFile, boolean start) {
		try {
		    installOrUpdate(outputFile,start);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

    /* Issue a refresh for the bundle ID associated with the JAR. */
	public void refresh(File outputFile) {
        try {
            _refresh(outputFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /* Uninstall from OSGi based on the bundle ID associated with the JAR. */
    public void uninstall(File outputFile) {
        try {
            _uninstall(outputFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void installOrUpdate(File outputFile, boolean start) throws Exception {
		
		String bsn;
		String hostBSN = null;

		try(Jar bundle = new Jar(outputFile);
            GogoTelnetClient client = new GogoTelnetClient(_host, _port)) {

            Manifest manifest = bundle.getManifest();
            Attributes mainAttributes = manifest.getMainAttributes();
            bsn = bundle.getBsn();

            List<BundleDTO> bundles = getBundles(client);

            long hostId = getBundleId(bundles, hostBSN);
            long existingId = getBundleId(bundles, bsn);
            String bundleURL = outputFile.toURI().toASCIIString();
            String response;

            if (existingId > 0) {

                if (start) {
                    response = client.send("stop " + existingId);
                    System.out.println(response);
                }

                response = client.send("update " + existingId + " " + bundleURL);
                System.out.println(response);

                if (start) {
                    response = client.send("start " + existingId);
                    System.out.println(response);
                }

                System.out.println("Updated bundle " + existingId);
            } else {
                response = client.send("install " + bundleURL);
                System.out.println(response);
                existingId = getBundleId(getBundles(client), bsn);
                if (start) {
                    if (existingId > 1) {
                        response = client.send("start " + existingId);
                        System.out.println(response);
                    } else {
                        System.out.println("Error: fail to install " + bsn);
                    }
                }
            }
        }
	}

    private void _uninstall(File outputFile) throws Exception {

        String bsn;

        try(Jar bundle = new Jar(outputFile);
            GogoTelnetClient client = new GogoTelnetClient(_host, _port)) {

            bundle.getManifest();
            bsn = bundle.getBsn();

            List<BundleDTO> bundles = getBundles(client);

            long existingId = getBundleId(bundles, bsn);

            if (existingId > 0) {
                String response = client.send("uninstall " + existingId);
                System.out.println(response);
                System.out.println("Uninstalled bundle " + existingId);
            } else {
                System.out.println("Error: cannot uninstall -- not installed " + bsn);
            }
        }
    }

    private void _refresh(File outputFile) throws Exception {

        String bsn;

        try(Jar bundle = new Jar(outputFile);
            GogoTelnetClient client = new GogoTelnetClient(_host, _port)) {
            bundle.getManifest();
            bsn = bundle.getBsn();

            List<BundleDTO> bundles = getBundles(client);

            long existingId = getBundleId(bundles, bsn);

            if (existingId > 0) {
                String response = client.send("refresh " + existingId);
                System.out.println(response);
                System.out.println("Refresh bundle " + existingId);
            } else {
                System.out.println("Error: cannot refresh -- not installed " + bsn);
            }
        }
    }

	private long getBundleId(List<BundleDTO> bundles, String bsn) throws IOException {
		long existingId = -1;

		if(bundles != null && bundles.size() > 0 ) {
			for (BundleDTO bundle : bundles) {
				if (bundle.symbolicName.equals(bsn)) {
					existingId = bundle.id;
					break;
				}
			}
		}

		return existingId;
	}

	private List<BundleDTO> getBundles(GogoTelnetClient client) throws IOException {

		List<BundleDTO> bundles = new ArrayList<>();
		String output = client.send("lb -s -u");
		String lines[] = output.split("\\r?\\n");
		for (String line : lines) {
			try {
				String[] fields = line.split("\\|");

				//ID|State|Level|Symbolic name
				BundleDTO bundle = new BundleDTO();

				bundle.id = Long.parseLong(fields[0].trim());
				bundle.state = getState(fields[1].trim());
				bundle.symbolicName = fields[3];

				bundles.add(bundle);
			}
			catch (Exception e) {
			}
		}

		return bundles;
	}

	private int getState(String state) {

		String bundleState = state.toUpperCase();

		if ("ACTIVE".equals(bundleState)) {
			return Bundle.ACTIVE;
		}
		else if ("INSTALLED".equals(bundleState)) {
			return Bundle.INSTALLED;
		}
		else if ("RESOLVED".equals(bundleState)) {
			return Bundle.RESOLVED;
		}
		else if ("STARTING".equals(bundleState)) {
			return Bundle.STARTING;
		}
		else if ("STOPPING".equals(bundleState)) {
			return Bundle.STOPPING;
		}
		else if ("UNINSTALLED".equals(bundleState)) {
			return Bundle.UNINSTALLED;
		}

		return 0;
	}
}